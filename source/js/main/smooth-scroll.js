'use strict';

(function () {
  let anchorLinks = document.querySelectorAll('a[href^="#"]:not([href$="#"])');

  if (window.smoothscroll) {
    window.__forceSmoothScrollPolyfill__ = true;
    window.smoothscroll.polyfill();
  }

  let initScrollThrough = function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let currentSection = document.querySelector(event.currentTarget.hash);
      if (currentSection) {
        currentSection.scrollIntoView({behavior: 'smooth'});
      }
    });
  };

  let initAnchors = function (links) {
    for (let i = 0; i < links.length; i++) {
      initScrollThrough(links[i]);
    }
  };

  initAnchors(anchorLinks);
})();
