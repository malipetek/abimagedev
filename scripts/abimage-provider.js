export default function providerPluginExample(userConfig) {
  // return object for analytics to use
  const customAnalyticsEndpoint = 'abimagedev-production.up.railway.app/api/track'

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
        body: JSON.stringify({
          date: meta.ts,
          session,
        })
      })
    },
    track: ({ payload }) => {
      const { meta, session, event, properties } = payload;
      fetch(customAnalyticsEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          date: meta.ts,
          session,
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