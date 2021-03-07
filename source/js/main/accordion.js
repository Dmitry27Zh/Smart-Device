'use strict';

(function () {
  const accordionClasslist = {
    accordion: '.accordion',
    TOGGLE: '.accordion__toggle',
    NO_JS: 'accordion--no-js',
    OPENED: 'accordion--opened',
  };
  const accordions = document.querySelectorAll(accordionClasslist.accordion);

  for (let accordion of accordions) {
    accordion.classList.remove(accordionClasslist.NO_JS);
    accordion.querySelector(accordionClasslist.TOGGLE).addEventListener('click', () => {
      if (accordion.classList.contains(accordionClasslist.OPENED)) {
        accordion.classList.remove(accordionClasslist.OPENED);
        return;
      }
      const openedSection = [...accordions].find((section) => section.classList.contains(accordionClasslist.OPENED));
      if (openedSection) {
        openedSection.classList.remove(accordionClasslist.OPENED);
      }
      accordion.classList.add(accordionClasslist.OPENED);
    });
  }
})();
