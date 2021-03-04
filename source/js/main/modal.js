'use strict';

(function () {
  const ClassName = {
    SHOW_ELEMENT: 'modal--show',
    CLOSE_BUTTON: '.modal__close',
    OVERLAY: '.modal__overlay',
  };


  window.modal = (modalElement, openButton, action) => {
    openButton.addEventListener('click', () => {
      modalElement.classList.add(ClassName.SHOW_ELEMENT);
      document.body.classList.add('lock');
      if (action) {
        action();
      }
      document.addEventListener('keydown', documentKeydownHandler);
    });

    const closeModal = () => {
      modalElement.classList.remove(ClassName.SHOW_ELEMENT);
      document.removeEventListener('keydown', documentKeydownHandler);
      document.body.classList.remove('lock');
    };

    const documentKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };

    modalElement.querySelector(ClassName.CLOSE_BUTTON).addEventListener('click', () => {
      closeModal();
    });

    modalElement.querySelector(ClassName.OVERLAY).addEventListener('click', () => {
      closeModal();
    });
  };
})();
