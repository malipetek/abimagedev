import Queue from './Queue.js';
const queue = new Queue();

const customAnalyticsEndpoint = 'https://abimagedev-production.up.railway.app/track'

export default function AbimageProvider(userConfig) {
  // return object for analytics to use

  return {
    name: 'abimage-provider',
    config: {
    },
    initialize: ({ config }) => {
      window.abimageLoaded = true
    },
    page: ({ payload }) => {
      const { meta, session } = payload;
      queue.add({
        date: meta.ts,
        session,
      }) 
    },
    track: ({ payload }) => {
      const { meta, userId, event, properties } = payload;
      queue.add({
        date: meta.ts,
        page: meta.page,
        session: userId,
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requests)
    })
    queue.clear();
  }
}

setInterval(sendRequests, 1000); // Send requests every second
