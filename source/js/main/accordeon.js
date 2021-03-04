'use strict';

(function () {
  const AccordeonClasslist = {
    ACCORDEON: '.accordeon',
    TOGGLE: '.accordeon__toggle',
    NO_JS: 'accordeon--no-js',
    OPENED: 'accordeon--opened',
  };
  const accordeons = document.querySelectorAll(AccordeonClasslist.ACCORDEON);

  if (accordeons) {
    for (let accordeon of accordeons) {
      accordeon.classList.remove(AccordeonClasslist.NO_JS);
      accordeon.querySelector(AccordeonClasslist.TOGGLE).addEventListener('click', () => {
        if (accordeon.classList.contains(AccordeonClasslist.OPENED)) {
          accordeon.classList.remove(AccordeonClasslist.OPENED);
          return;
        }
        const openedSection = [...accordeons].find((section) => section.classList.contains(AccordeonClasslist.OPENED));
        if (openedSection) {
          openedSection.classList.remove(AccordeonClasslist.OPENED);
        }
        accordeon.classList.add(AccordeonClasslist.OPENED);
      });
    }
  }
})();
