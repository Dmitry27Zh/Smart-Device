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

'use strict';

(function () {
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

  const activateLocalStorage = (formElement, nameInputElement, telInputElement, textMessageElement) => {
    if (isStorageSupport) {
      if (storageName) {
        nameInputElement.value = storageName;
      }
      if (storageTel) {
        telInputElement.value = storageTel;
      }
      if (storageMessage) {
        textMessageElement.value = storageMessage;
      }
    }
    formElement.addEventListener('submit', () => {
      localStorage.setItem('user-name', nameInputElement.value);
      localStorage.setItem('user-tel', telInputElement.value);
      if (textMessageElement.value) {
        localStorage.setItem('user-message', textMessageElement.value);
      }
    });
  };

  for (let feedbackFormElement of feedbackFormElements) {
    const nameInputElement = feedbackFormElement.querySelector('[id^="feedback-name"]');
    const telInputElement = feedbackFormElement.querySelector('[id^="feedback-tel"]');
    const textMessageElement = feedbackFormElement.querySelector('[id^="feedback-message"]');
    activateLocalStorage(feedbackFormElement, nameInputElement, telInputElement, textMessageElement);
    window.validation(telInputElement)();
  }
})();

'use strict';

(function () {
  const feedbackModalElement = document.querySelector('.feedback--modal');
  const modalNameInputElement = feedbackModalElement.querySelector('#feedback-name-modal');
  const openFeedbackModalElement = document.querySelector('.header__callback');

  const initModal = window.modal;
  initModal(feedbackModalElement, openFeedbackModalElement, () => modalNameInputElement.focus());
})();
