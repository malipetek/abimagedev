export default function providerPluginExample(userConfig) {
  // return object for analytics to use
  const customAnalyticsEndpoint = 'abimagedev-production.up.railway.app/api/track'

  return {
    /* All plugins require a name */
    name: 'abimage-provider',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {
      whatEver: userConfig.whatEver,
      elseYouNeed: userConfig.elseYouNeed
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