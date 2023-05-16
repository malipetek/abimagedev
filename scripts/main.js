import Analytics from 'analytics';
import { v4 as uuid } from 'uuid';
import abimageProvider from './abimage-provider';

const analytics = Analytics({
  app: 'abimage',
  version: 1,
  plugins: [
    abimageProvider()
  ]
});

const { storage } = analytics;
const session = storage.getItem('session_idetifier') || uuid();
storage.setItem('session_identifier', session);

analytics.identify(session);

analytics.page();

const visibleImages = [];

const images = document.querySelectorAll('img');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
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
  observer.observe(image);
});

setInterval(() => {
  if(visibleImages.length > 0) {
    analytics.track('imageViewTick', {
      images: visibleImages,
    });
  }
}, 10000);