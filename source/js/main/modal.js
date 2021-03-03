'use strict';

(function () {
  const MODAL_SHOW_CLASSNAME = 'modal--show';
  const MODAL_CLOSEBUTTON_CLASSNAME = '.modal__close';
  const MODAL_OVERLAY_CLASSNAME = '.modal__overlay';

  window.modal = (modalElement, openButton) => {
    openButton.addEventListener('click', () => {
      modalElement.classList.add(MODAL_SHOW_CLASSNAME);
      document.body.classList.add('lock');
      document.addEventListener('keydown', documentKeydownHandler);
    });

    const closeModal = () => {
      modalElement.classList.remove(MODAL_SHOW_CLASSNAME);
      document.removeEventListener('keydown', documentKeydownHandler);
      document.body.classList.remove('lock');
    };

    const documentKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    modalElement.querySelector(MODAL_CLOSEBUTTON_CLASSNAME).addEventListener('click', () => {
      closeModal();
    });

    modalElement.querySelector(MODAL_OVERLAY_CLASSNAME).addEventListener('click', () => {
      closeModal();
    });
  };
})();
