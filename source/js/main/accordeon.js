'use strict';

(function () {
  const OPENED_SECTION_CLASS = 'footer__section--opened';
  const sectionElements = document.querySelectorAll('.footer__section');

  if (sectionElements) {
    for (let sectionElement of sectionElements) {
      sectionElement.classList.remove('footer__section--no-js');
      sectionElement.querySelector('.footer__section-toggle').addEventListener('click', () => {
        if (sectionElement.classList.contains(OPENED_SECTION_CLASS)) {
          sectionElement.classList.remove(OPENED_SECTION_CLASS);
          return;
        }
        const openedSection = [...sectionElements].find((section) => section.classList.contains(OPENED_SECTION_CLASS));
        if (openedSection) {
          openedSection.classList.remove(OPENED_SECTION_CLASS);
        }
        sectionElement.classList.add(OPENED_SECTION_CLASS);
      });
    }
  }
})();
