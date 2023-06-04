import { v4 as uuidv4 } from 'uuid';

export default class Analytics {
  constructor({ app, version, plugins }) {
    this.app = app;
    this.version = version;
    this.plugins = plugins;
    this.sessionId = uuidv4();
    this.anonymousId = uuidv4();

    return this;
  }

  storage = {
    setItem: (key, value) => {
      localStorage.setItem(key, value);
    },
    getItem: (key) => {
      return localStorage.getItem(key);
    }
    // ...
  }

  page(properties, options = {}) {
    const payload = {
      type: 'track',
      event: "page",
      properties,
      userId: this.userId || this.sessionId,
      anonymousId: this.anonymousId,
      meta: {
        ts: Date.now(),
      }
    };
    this.plugins.forEach(plugin => {
      plugin?.page(payload);
    });
  }

  identify(userId, traits = {}) {
    this.userId = userId;
    this.plugins.forEach(plugin => {
      plugin?.identify(userId, traits);
    });
  }

  track(event, properties, options = {}) {
    const payload = {
      type: 'track',
      event,
      properties,
      options,
      userId: this.userId || this.sessionId,
      anonymousId: this.anonymousId,
      meta: {
        ts: Date.now(),
      }
    };

    this.plugins.forEach(plugin => {
      plugin?.track(payload);
    });
  }
}
