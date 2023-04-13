function observeImages() {
  const images = document.querySelectorAll('img');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const data = {
          visible: true,
          src: entry.target.src,
          width: entry.target.width,
          height: entry.target.height,
          screenW: screen.availWidth,
          screenH: screen.availHeight,
          orientation: screen.orientation.type
        };
      }
    });
  }, options);
  
  return {
    observe() {
      images.forEach(image => {
        observer.observe(image);
      });
    },
    unObserve() {
      images.forEach(image => {
        observer.unobserve(image);
      });
    },
    reCheck() { 
      if(images !== document.querySelectorAll('img')) {
        this.unObserve();
        this.observe();
      }
    }
  };
}

setInterval(() => {
  ga(function (tracker) {
    var sessionId = tracker.get('sessionId');
    console.log(sessionId);
    fetch('https://your-endpoint.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        images,
        screen_width: screen.availWidth,
        screen_height: screen.availHeight
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  });
}, 10e3);