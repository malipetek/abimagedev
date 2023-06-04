import { PostgreSQLSessionStorage } from "@shopify/shopify-app-session-storage-postgresql";
import directus from "./directus.js";

export class DirectusAttachedStorage extends PostgreSQLSessionStorage {
  async storeSession(session) {
    try {
      const {data: [existingSession]} = await directus.items('shopify_sessions').readByQuery({ filter: { id: { _eq: session.id } }});
      if (existingSession) {
        await directus.items('shopify_sessions').updateOne(session.id, {...session, expires: session.expires?.toISOString()});
      } else {
        await directus.items('shopify_sessions').createOne({...session, expires: session.expires?.toISOString()});
      }
      return true;
    } catch (err) {
      console.log('🛑🛑🛑🛑 directus error: ', err.message);
      return false;
    } 
  }

  async getOnlineAccessInfo(sessionId) {
    const item = await directus.items('shopify_sessions').readOne(sessionId)
    if (item) {
        return item?.onlineAccessInfo?.associated_user;
    } else {
        return null;
    }
  }
}