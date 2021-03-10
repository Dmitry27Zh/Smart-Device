'use strict';

(function () {
  const accordionClassList = {
    accordion: '.accordion',
    TOGGLE: '.accordion__toggle',
    NO_JS: 'accordion--no-js',
    OPENED: 'accordion--opened',
  };
  const accordions = document.querySelectorAll(accordionClassList.accordion);

  for (let accordion of accordions) {
    accordion.classList.remove(accordionClassList.NO_JS);
    accordion.querySelector(accordionClassList.TOGGLE).parentElement.addEventListener('click', () => {
      if (accordion.classList.contains(accordionClassList.OPENED)) {
        accordion.classList.remove(accordionClassList.OPENED);
        return;
      }
      const openedSection = [...accordions].find((section) => section.classList.contains(accordionClassList.OPENED));
      if (openedSection) {
        openedSection.classList.remove(accordionClassList.OPENED);
      }
      accordion.classList.add(accordionClassList.OPENED);
    });
  }
})();
