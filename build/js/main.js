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

'use strict';

(function () {
  const TEL_MASK = '+7(xxx)xxx-xx-xx';

  const formatTel = ([...tel]) => {
    let result = TEL_MASK;
    for (let number of tel.slice(3).filter(Number)) {
      result = result.replace('x', number);
    }
    return result.indexOf('x') > 0 ? result.slice(0, result.indexOf('x')) : result;
  };

  window.validation = (telInputElement) => {
    let isErasing = false;

    const documentKeydownHandler = (evt) => {
      if (isNaN(evt.key) && evt.key !== 'Backspace' && evt.key !== 'Tab' && evt.key !== 'Enter' ||
      evt.key === 'Backspace' && telInputElement.value.length === 3) {
        evt.preventDefault();
      }
      if (evt.key === 'Backspace') {
        isErasing = true;
        return;
      }
      isErasing = false;
    };

    return () => {
      telInputElement.addEventListener('focus', () => {
        document.addEventListener('keydown', documentKeydownHandler);
        if (!telInputElement.value) {
          telInputElement.value = '+7(';
        }
      });

      telInputElement.addEventListener('blur', () => {
        document.removeEventListener('keydown', documentKeydownHandler);
      });

      telInputElement.addEventListener('input', () => {
        if (isErasing) {
          return;
        }
        telInputElement.value = formatTel(telInputElement.value);
      });
    };
  };
})();

'use strict';

(function () {
  const pageTelInputElement = document.querySelector('#feedback-tel');
  const feedbackModalElement = document.querySelector('.feedback--modal');
  const modalNameInputElement = feedbackModalElement.querySelector('#feedback-modal-name');
  const modalTelInputElement = feedbackModalElement.querySelector('#feedback-modal-tel');
  const openFeedbackModalElement = document.querySelector('.header__callback');
  const feedbackFormElements = document.querySelectorAll('.feedback__form');
  let isStorageSupport = true;
  let storageName = null;
  let storageTel = null;
  let storageMessage = null;

  try {
    storageName = localStorage.getItem('user-name');
  } catch (err) {
    isStorageSupport = false;
  }

  if (isStorageSupport) {
    storageTel = localStorage.getItem('user-tel');
    storageMessage = localStorage.getItem('user-message');
  }

  const initPageTelValidation = window.validation(pageTelInputElement);
  initPageTelValidation();

  const initModalTelValidation = window.validation(modalTelInputElement);
  initModalTelValidation();

  const initModal = window.modal;
  initModal(feedbackModalElement, openFeedbackModalElement, () => modalNameInputElement.focus());

  for (let feedbackFormElement of feedbackFormElements) {
    const inputNameElement = feedbackFormElement.querySelector('.tel-js');
    const inputTelElement = feedbackFormElement.querySelector('.name-js');
    const textMessageElement = feedbackFormElement.querySelector('.message-js');
    if (isStorageSupport) {
      if (storageName) {
        inputNameElement.value = storageName;
      }
      if (storageTel) {
        inputTelElement.value = storageTel;
      }
      if (storageMessage) {
        textMessageElement.value = storageMessage;
      }
    }
    feedbackFormElement.addEventListener('submit', () => {
      localStorage.setItem('user-name', inputNameElement.value);
      localStorage.setItem('user-tel', inputTelElement.value);
      if (textMessageElement.value) {
        localStorage.setItem('user-message', textMessageElement.value);
      }
    });
  }

})();
