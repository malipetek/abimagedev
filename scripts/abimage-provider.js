import { compressToBase64 } from 'lz-string';
import Queue from './Queue.js';
const queue = new Queue('abimage_analytics_queue');

const customAnalyticsEndpoint = 'https://dev.abimage.app/track'

export default function AbimageProvider() {
  // return object for analytics to use

  return {
    name: 'abimage-provider',
    config: {},
    initialize: ({ config }) => {
      window.abimageLoaded = true
    },
    page: ({ payload }) => {
      const { meta, session, userId, properties } = payload;
      queue.add({
        event: 'pageView',
        date: meta.ts,
        page: meta.page,
        session: userId,
        properties
      })
    },
    track: ({ payload }) => {
      const { meta, userId, event, properties } = payload;
      queue.add({
        date: meta.ts,
        page: meta.page,
        session: userId,
        path: properties.path,
        event,
        properties
      }) 
    },
    // identify: ({ payload }) => {

    // },
    loaded: () => {
      return !!window.abimageLoaded
    }
  }
}

const sendRequests = () => {
  const requests = queue.getAll();
  if (requests.length > 0) {
    fetch(customAnalyticsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: compressToBase64(JSON.stringify(requests))
    })
    queue.clear();
  }
}

setInterval(sendRequests, 10000); // Send requests every 10 seconds
