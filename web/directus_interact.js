import { Directus } from '@directus/sdk';
import dotenv from 'dotenv';
dotenv.config();
import products from './products.json' assert { type: "json" };

const directus = new Directus(process.env.DIRECTUS_URL, {
  auth: {
    mode: 'json',
    staticToken: process.env.DIRECTUS_TOKEN,
  },
  storage: {
    prefix: 'directus_',
    mode: 'MemoryStorage'
  }
});

(async () => {
  try {
    await directus.auth.static(process.env.DIRECTUS_TOKEN);

    await directus.items('products')
      .createMany(products
      .slice(20,30)
      .map(p => ({
        ...p,
        shop_id: 62144446683,
        image: null,
        images: null,
        variants: null
      })));
    
    await directus.items('products').updateBatch(products
      .slice(20, 30)
      .map(p => ({
        ...p,
        variants: null
      })));
    
    await directus.items('products').updateBatch(products
      .slice(20, 30)
      .map(p => ({
        ...p,
        images: null,
        image: null
      })));

    // await directus.items('variants').createMany(products.map(product => product.variants).flat());
  } catch (error) {
    console.log(error);
  }
})();