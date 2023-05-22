import Analytics from 'analytics';
import { v4 as uuid } from 'uuid';
import abimageProvider from './abimage-provider';
import onRouteChange from '@analytics/router-utils'
import { onIdle, onWakeUp } from '@analytics/activity-utils'

const analytics = Analytics({
  app: 'abimage',
  version: '1.0.4',
  plugins: [
    abimageProvider()
  ]
});

const { storage } = analytics;
const session = storage.getItem('__abmg_ssi') || uuid();
storage.setItem('__abmg_ssi', session);

analytics.identify(session);

const FIVE_MINUTES = 300e3
const ONE_MINUTES = 60e3

const opts = {
  timeout: ONE_MINUTES,
}

function initialize() {

  analytics.page();
  
  const visibleImages = [];
  
  const images = [...document.images];
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
    trackVisibility: false,
    delay: 100
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        analytics.track('imageView', {
          image: entry.target.src,
          width: entry.target.width,
          height: entry.target.height,
          screen_width: screen.availWidth,
          screen_height: screen.availHeight
        });
        visibleImages.push(entry.target.src);
      } else {
        const wasVisibleIndex = visibleImages.indexOf(entry.target.src);
        if (wasVisibleIndex !== -1) {
          visibleImages.splice(wasVisibleIndex, 1);
          analytics.track('imageHide', {
            image: entry.target.src,
          });
        }
      }
    });
  }, options);
  
  images.forEach(image => {
    console.log('starting to observe ', image);
    observer.observe(image);
  });

  return {
    observer,
    images,
    visibleImages
  };
}

// initialize on page load
let { observer, images, visibleImages } = initialize();

function keepTracking() {
  let int;
  let start = () => setInterval(() => {
  if (visibleImages.length > 0) {
    analytics.track('imageViewTick', {
      images: visibleImages,
    });
  }
  // check if document has new images start observing new ones and stop observing old ones
  const newImages = [...document.images].filter(image => !images.includes(image));
    newImages.forEach(image => {
    // start observing new images
    console.log('starting to observe new image ', image);
    observer.observe(image);
  });
  // stop observing old images
  images.forEach(image => {
    if (!newImages.includes(image)) {
      observer.unobserve(image);
    }
  });
    
  images = [...document.images];
  // also update visible images array
  visibleImages.forEach(image => {
    if (!images.includes(image)) {
      visibleImages.splice(images.indexOf(image), 1);
    }
  });
  }, 10000);

  return {
    stop: () => {
      clearInterval(int);
    },
    start: () => {
      int = start();
    }
  }
}

const trackKeeper = keepTracking();
trackKeeper.start();


onIdle((activeTime) => {
  trackKeeper.stop();
}, opts);

onWakeUp(() => {
  trackKeeper.start();
  analytics.track('reVisit');
}, opts);

// reinitialize when user navigates to a new page
window.addEventListener('popstate', () => {
  let res = initialize();
  observer.disconnect();

  observer = res.observer;
  images = res.images;
  visibleImages = res.visibleImages;
});

// detech add to cart by detecting fetch requests to /cart/add or navigation to /cart/add
const originalFetch = window.fetch;
window.fetch = function () {
  const args = arguments;
  const url = args[0];
  if (url === '/cart/add') {
    analytics.track('addToCart', {
      products: args[1].body
    });
  }
  return originalFetch.apply(this, args);
}

// detect link clicks
document.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'A') {
    analytics.track('linkClick', {
      href: e.target.href,
      text: e.target.innerText
    });
  }
});

