'use strict';

(function () {
  const Breakpoints = {
    MOBILE_MAX: 767,
    TABLET_MAX: 1023,
  };

  const textBlockToEllipsize = document.querySelector('.info__wrapper p:last-of-type');
  const initialTextContent = textBlockToEllipsize.innerText;

  const ellipsize = (element, wordSeparator) => {
    const words = initialTextContent.split(' ');
    const indexOfSepearator = words.indexOf(wordSeparator);
    element.innerText = words.slice(0, indexOfSepearator).join(' ') + '..';
  };

  const screenSizeChangeHandler = () => {
    if (document.documentElement.clientWidth <= Breakpoints.TABLET_MAX) {
      ellipsize(textBlockToEllipsize, textBlockToEllipsize.dataset.wordSeparator);
      return;
    }
    textBlockToEllipsize.innerText = initialTextContent;
  };


  window.addEventListener('resize', screenSizeChangeHandler);

  window.addEventListener('orientationchange', screenSizeChangeHandler);
})();
