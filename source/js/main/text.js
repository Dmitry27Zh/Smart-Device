'use strict';

(function () {
  const Breakpoints = {
    MOBILE_MAX: 767,
    TABLET_MAX: 1023,
  };

  const textBlockToEllipsize = document.querySelector('.info__text-bottom p');
  const initialTextContent = textBlockToEllipsize && textBlockToEllipsize.innerText;

  const ellipsize = (element, wordSeparator) => {
    const words = initialTextContent.split(' ');
    const indexOfSepearator = words.indexOf(wordSeparator);
    element.innerText = words.slice(0, indexOfSepearator + 1).join(' ') + '..';
  };

  const initEllipsize = () => {
    if (document.documentElement.clientWidth <= Breakpoints.TABLET_MAX && textBlockToEllipsize.dataset.wordSeparator) {
      ellipsize(textBlockToEllipsize, textBlockToEllipsize.dataset.wordSeparator);
      return;
    }
    textBlockToEllipsize.innerText = initialTextContent;
  };

  window.common.startActionWithCheck([textBlockToEllipsize], () => {
    initEllipsize();
    window.addEventListener('resize', initEllipsize);
    window.addEventListener('orientationchange', initEllipsize);
  });
})();
