// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import dotenv from "dotenv";
dotenv.config();

import events from './events.js';
import shopify from "./shopify.js";
import directus from "./directus.js";

import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import WebHooks from "./webhooks.js";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// debug
app.all('*', (req, res, next) => {
  console.log('request url: ', req.url);
  console.log('request body: ', req.body);
  console.log('request method: ', req.method);
  next();
});
app.use('/scripts', express.static(join(process.cwd(), 'scripts')));

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  events.installed,
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({
    webhookHandlers: {
      ...GDPRWebhookHandlers,
      ...WebHooks
    }  
  })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.post('/api/graphql/proxy', async (req, res) => {

  const sessionId = await shopify.api.session.getCurrentId({
    isOnline: shopify.config.useOnlineTokens,
    rawRequest: req,
    rawResponse: res,
  });
  // use sessionId to retrieve session from app's session storage
  // getSessionFromStorage() must be provided by application
  if (!sessionId) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const session = await shopify.config.sessionStorage.loadSession(sessionId);

  if (!session) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  try {
    const response = await shopify.api.clients.graphqlProxy({
      session,
      rawBody: req.body,
    });
  
    res.send(response.body);
  }
  catch (e) {
    console.log('error', e);
    res.status(500).send({ error: e.message });
  }
});
function getImageIdentifier(uri) {
  let image_identifier = null;
  try {
    const u = new URL(uri);
    image_identifier = u.pathname.split('/').pop();
  } catch (e) {
    image_identifier = 'unknown';
  }
  return image_identifier
}

app.options('/track', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.send();
});

app.post('/track', async (req, res) => {
  const { date, event, properties, session } = req.body;
  res.set('Access-Control-Allow-Origin', '*');

  try {
    if (event === 'imageView') {
      const result = await directus.items('events').createOne({
        shop: req.headers.origin.split('//').pop(),
        date,
        event_type: event,
        session,
        image_identifier: getImageIdentifier(properties.image),
        event_payload: properties,
      })
      console.log('create result ', result)
    }

    else if (event == 'imageTick') {
      await Promise.all((Array.isArray(properties.images) ? properties.images : []).map((image) => {
        return directus.items('events').createOne({
          shop: req.headers.origin.split('//').pop(),
          date,
          event_type: event,
          session,
          image_identifier: getImageIdentifier(image),
          event_payload: properties,
        });
      }));
    }

    else {
      await directus.items('events').createOne({
        shop: req.headers.origin.split('//').pop(),
        date,
        event_type: event,
        session,
        event_payload: properties,
      });
    } 
  } catch (e) {
    console.error(e);
  }
  
  res.status(200).send();
});
  
app.get('/api/script-status', async (req, res) => {
  const { enable, disable, toggle } = req.query;
 
  const sessionId = await shopify.api.session.getCurrentId({
    isOnline: shopify.config.useOnlineTokens,
    rawRequest: req,
    rawResponse: res,
  });
  // use sessionId to retrieve session from app's session storage
  // getSessionFromStorage() must be provided by application
  if (!sessionId) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const session = await shopify.config.sessionStorage.loadSession(sessionId);

  if (!session) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

/**********************************
 * GET CURRENT DATA FROM DIRECTUS *
 **********************************/
  // @ts-ignore
  let { data: [ { config: [ { id: configId, config } ] } ] } = await directus.items('shopify_shops').readByQuery({
    filter: {
      myshopify_domain: {
        _eq: session.shop,
      }
    },
    fields: [
      'myshopify_domain',
      'config.*'
    ]
  });

/**************************
 * DEFINE RESAVE FUNCTION *
 **************************/
  
  // check if changed
  const save = () => directus.items('abimage_shop_config').updateOne(configId, {
    config,
  });
  
/****************
 * HANDLE LOGIC *
 ****************/
  if (enable !== undefined && config.script_enabled !== false) {
    config = {
      ...config,
      script_enabled: true,
    }
    await save();
  }
  else if (disable !== undefined && config.script_enabled !== true) {
      config = {
      ...config,
      script_enabled: false,
      }
    await save();
  }
  else if (toggle !== undefined && config.script_enabled !== null) {
    config = {
      ...config,
      script_enabled: !config.script_enabled,
    }
    await save();
  }

  return res.send({ config });
});

app.post('/api/session', async (req, res) => {

  const sessionId = await shopify.api.session.getCurrentId({
    isOnline: shopify.config.useOnlineTokens,
    rawRequest: req,
    rawResponse: res,
  });
  // use sessionId to retrieve session from app's session storage
  // getSessionFromStorage() must be provided by application
  if (!sessionId) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const session = await shopify.config.sessionStorage.loadSession(sessionId);

  if (!session) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  try {
    const response = await shopify.api.clients.graphqlProxy({
      session,
      rawBody: req.body,
    });
  
    res.send(response.body);
  }
  catch (e) {
    console.log('error', e);
    res.status(500).send({ error: e.message });
  }
});

app.get("/test", async (_req, res) => { 
  res.status(200).send('test');
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await directus.auth.static(process.env.DIRECTUS_TOKEN);
});
