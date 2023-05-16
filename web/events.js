import directus from './directus.js';
import shopify from './shopify.js';
import fs from 'fs';

export default {
  async installed(req, res, next) {
    const [shop] = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    // save shop data to directus
    try {
  
      const response = await shopify.webhooks.register({
        session: res.locals.shopify.session,
      });
  
      if (!response['PRODUCTS_CREATE'][0].success) {
        console.log(
          `Failed to register PRODUCTS_CREATE webhook: ${response['PRODUCTS_CREATE'][0].result}`,
        );
      }
    } catch (error) {
      console.error(error); // in practice these should be handled more gracefully
    }

    return next();
  }
};