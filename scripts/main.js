import Analytics from 'analytics';
import { v4 as uuid } from 'uuid';
import abimageProvider from './abimage-provider';
import onRouteChange from '@analytics/router-utils';
import { onIdle, onWakeUp } from '@analytics/activity-utils';
const FIVE_MINUTES = 300e3;
const ONE_MINUTES = 60e3;
const TEN_SECONDS = 10e3;
const ONE_SECOND = 1e3;
const IMAGE_TICK_INTERVAL = ONE_SECOND; 

const analytics = Analytics({
  app: 'abimage',
  version: '1.0.5',
  plugins: [
    abimageProvider()
  ]
});

const { storage } = analytics;
const session = storage.getItem('__abmg_ssi') || uuid();
storage.setItem('__abmg_ssi', session);

analytics.identify(session);


const opts = {
  timeout: ONE_MINUTES,
}

function initialize() {

  analytics.page();
  /**
   * An array of image URLs that are currently visible on the page.
   * @type {HTMLImageElement[]}
   */
  const visibleImages = [];
  
  /**
   * An array of all image elements on the page.
   * @type {HTMLImageElement[]}
   */
  const images = [...document.images];
  const imageLocations = {
    set images(imgs) {
      this.imgs = imgs;
      this.boxes = imgs.map(img => 
        [img,
        img.getBoundingClientRect()]
      );  
    },
    /**
     * 
     * @param {object} coords
     * @param {number} coords.x
     * @param {number} coords.y
     * @returns {undefined | HTMLImageElement}
     */
    within([x,y]) {
      return (boxes.find(([img, box]) =>  x > box.left && x < box.right && y > box.top && y < box.bottom) || [])[0];
    }
  };

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
          path: window.location.pathname,
          image: entry.target.src,
          width: entry.target.width,
          height: entry.target.height,
          screen_width: screen.availWidth,
          screen_height: screen.availHeight
        });
        visibleImages.push(entry.target);
      } else {
        const wasVisibleIndex = visibleImages.indexOf(entry.target);
        if (wasVisibleIndex !== -1) {
          visibleImages.splice(wasVisibleIndex, 1);
          analytics.track('imageHide', {
            path: window.location.pathname,
            image: entry.target.src,
            width: entry.target.width,
            height: entry.target.height,
            screen_width: screen.availWidth,
            screen_height: screen.availHeight
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
      path: window.location.pathname,
      images: visibleImages.map(image => image.src),
    });
  }
  // check if document has new images start observing new ones and stop observing old ones
  const newImages = [...document.images].filter(image => !images.includes(image));
    newImages.forEach(image => {
    // start observing new images
    console.log('starting to observe new image ', image);
    observer.observe(image);
    });
  const oldImages = images.filter(image => ![...document.images].includes(image));
  // stop observing old images
    oldImages.forEach(image => {
    visibleImages.splice(images.indexOf(image), 1);
    observer.unobserve(image);
  });
    
  images = [...document.images];
  imageLocations.images = images;

  // also update visible images array
  visibleImages.forEach(image => {
    if (!images.includes(image)) {
      images.splice(images.indexOf(image), 1);
    }
  });
  }, IMAGE_TICK_INTERVAL);

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
  analytics.track('idle', {
    path: window.location.pathname,
    activeTime: activeTime
  });
  trackKeeper.stop();
}, opts);

onWakeUp(() => {
  trackKeeper.start();
  analytics.track('reVisit', {
    path: window.location.pathname
  });
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
      path: window.location.pathname,
      products: args[1].body
    });
  }
  return originalFetch.apply(this, args);
}

document.addEventListener('click', event => {
  const clickedElement = event.target;
  const linkedImage = imageLocations.within([event.pageX, event.pageY]);
  
  if (linkedImage && clickedElement.tagName === 'A') {
    analytics.track('imageLinkClick', {
      image: linkedImage.src,
      text: clickedElement.innerText,
      link: clickedElement.href,
      path: window.location.pathname
    });
  }
  if (event.target && event.target.tagName === 'A') {
    analytics.track('linkClick', {
      href: clickedElement.href,
      text: event.target.innerText,
      path: window.location.pathname
    });
  }
});

function trackButbutton() {
  const buyButton = document.querySelector('.shopify-payment-button__button');
  buyButton.addEventListener('click', event => {
    analytics.track('buyButtonClick', {
      path: window.location.pathname
    });
  });
}

(() => {
  if(document.readyState === 'complete') {
    trackButbutton();
  } else {
    document.addEventListener('DOMContentLoaded', trackButbutton);
  }
})();
