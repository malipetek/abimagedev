import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { DirectusAttachedStorage } from "./directus_storage.js";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-01";
import dotenv from "dotenv";
dotenv.config();

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
const DB_PATH = new URL(process.env.DATABASE_URL || "postgres://localhost:5432/shopify" );

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
  "Pro": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 10.00,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  },
  "Max": {
    // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
    amount: 20.00,
    currencyCode: "USD",
    interval: BillingInterval.Every30Days,
  },
};

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  useOnlineTokens: true,
  // This should be replaced with your preferred storage strategy
  sessionStorage: new DirectusAttachedStorage(DB_PATH),
});

export default shopify;
