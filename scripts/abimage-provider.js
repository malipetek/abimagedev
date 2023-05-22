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
      console.log('page ', payload);
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
      console.log('tarcking ', payload);
      const { meta, userId, event, properties } = payload;
      queue.add({
        date: meta.ts,
        page: meta.page,
        session: userId,
        path: window.location.pathname,
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
