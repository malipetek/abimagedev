const images = document.querySelectorAll('img');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry.target.src + ' is visible');
      console.log('Width: ' + entry.target.width);
      console.log('Height: ' + entry.target.height);
      console.log('Screen Width: ' + screen.availWidth);
      console.log('Screen Height: ' + screen.availHeight);
    }
  });
}, options);

images.forEach(image => {
  observer.observe(image);
});

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
}, 10000);