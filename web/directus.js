import fetch from 'node-fetch';
import { Directus } from "@directus/sdk";
import dotenv from "dotenv";
dotenv.config();

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

export async function sendWebhookToDirectus(topic, shop, body, webhookId) {
  const payload = JSON.parse(body);
  const endpoint = await getDirectusFlowEndpoint(topic);
  
  if (endpoint) {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`
      },
      body: JSON.stringify({
        shop,
        webhookId,
        payload,
      })
    })
  }
}
async function getDirectusFlowEndpoint(topic) {
  // https://directus-production-de8e.up.railway.app/flows?filter[name]name=PRODUCTS_CREATED
  const response = await fetch(`${process.env.DIRECTUS_URL}/flows?filter[name]=${topic}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIRECTUS_TOKEN}`
      }
  });
  const body = await response.json();
  const { data } = body;
  if (!data.length) {
    return false;
  }
  const [{ id }] = data;
  // https://directus-production-de8e.up.railway.app/flows/trigger/622f2b12-f966-4845-b60a-52ce5bd6f036
  return `${process.env.DIRECTUS_URL}/flows/trigger/${id}`;
}

export default directus;
