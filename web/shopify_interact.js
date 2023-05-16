import '@shopify/shopify-api/adapters/node';
import { shopifyApi } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';

const shopify = new shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY,
  scopes: process.env.SHOPIFY_SCOPES,
  shop: process.env.SHOPIFY_SHOP,
  restResources
});

const rest = new shopifyApi.prototype.clients.Rest({
  session: {
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  },
});


restResources.Product.all({
  limit: 50,
  session: {
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  },
});