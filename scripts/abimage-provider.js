export default function providerPluginExample(userConfig) {
  // return object for analytics to use
  const customAnalyticsEndpoint = 'https://abimagedev-production.up.railway.app/track'

  return {
    name: 'abimage-provider',
    config: {
    },
    initialize: ({ config }) => {
      window.abimageLoaded = true
    },
    page: ({ payload }) => {
      const { meta, session } = payload;
      fetch(customAnalyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: meta.ts,
          session,
        })
      })
    },
    track: ({ payload }) => {
      const { meta, userId, event, properties } = payload;
      fetch(customAnalyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: meta.ts,
          session: userId,
          event,
          properties
        })
      })
    },
    // identify: ({ payload }) => {

    // },
    loaded: () => {
      return !!window.abimageLoaded
    }
  }
}