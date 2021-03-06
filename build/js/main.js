'use strict';

(function () {
  const startActionWithCheck = (elementsList, action) => {
    if (elementsList.length > 0 && elementsList.every((element) => element)) {
      action();
    }
  };

  window.common = {
    startActionWithCheck,
  };
})();

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

'use strict';

(function () {
  const ClassName = {
    SHOW_ELEMENT: 'modal--show',
    CLOSE_BUTTON: '.modal__close',
    OVERLAY: '.modal__overlay',
  };

  window.modal = {};


  window.modal.init = (modalElement, openButton, action) => {
    openButton.addEventListener('click', (evt) => {
      evt.preventDefault();
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
    for (let number of tel.slice(3).filter(isFinite)) {
      result = result.replace('x', number);
    }
    return result.indexOf('x') > 0 ? result.slice(0, result.indexOf('x')) : result;
  };

  window.validation = {};

  window.validation.initTel = (telInputElement) => {
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

  const textBlockToEllipsize = document.querySelector('.info__text-bottom p');
  const initialTextContent = textBlockToEllipsize && textBlockToEllipsize.innerText;

  const ellipsize = (element, wordSeparator) => {
    const words = initialTextContent.split(' ');
    const indexOfSeparator = words.indexOf(wordSeparator);
    element.innerText = words.slice(0, indexOfSeparator + 1).join(' ') + '..';
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
        window.common.startActionWithCheck([nameInputElement], () => {
          nameInputElement.value = storageName;
        });

      }
      if (storageTel) {
        window.common.startActionWithCheck([telInputElement], () => {
          telInputElement.value = storageTel;
        });
      }
      if (storageMessage) {
        window.common.startActionWithCheck([textMessageElement], () => {
          textMessageElement.value = storageMessage;
        });
      }
    }
    formElement.addEventListener('submit', () => {
      window.common.startActionWithCheck([nameInputElement], () => {
        localStorage.setItem('user-name', nameInputElement.value);
      });
      window.common.startActionWithCheck([telInputElement], () => {
        localStorage.setItem('user-tel', telInputElement.value);
      });
      window.common.startActionWithCheck([textMessageElement], () => {
        if (textMessageElement.value) {
          localStorage.setItem('user-message', textMessageElement.value);
        }
      });
    });
  };

  for (let feedbackFormElement of feedbackFormElements) {
    const nameInputElement = feedbackFormElement.querySelector('[id^="feedback-name"]');
    const telInputElement = feedbackFormElement.querySelector('[id^="feedback-tel"]');
    const textMessageElement = feedbackFormElement.querySelector('[id^="feedback-message"]');
    const approvalElement = feedbackFormElement.querySelector('[id^="feedback-approval"]');
    const submitButtonElement = feedbackFormElement.querySelector('[type="submit"]');
    activateLocalStorage(feedbackFormElement, nameInputElement, telInputElement, textMessageElement);
    window.common.startActionWithCheck([telInputElement], () => {
      window.validation.initTel(telInputElement)();
    });
    window.common.startActionWithCheck([approvalElement, submitButtonElement], () => {
      approvalElement.addEventListener('change', () => {
        submitButtonElement.disabled = !approvalElement.checked;
      });
    });
  }

})();

'use strict';

(function () {
  let anchorLinks = document.querySelectorAll('a[href^="#"]:not([href$="#"])');

  if (window.smoothscroll) {
    window.__forceSmoothScrollPolyfill__ = true;
    window.smoothscroll.polyfill();
  }

  let initScrollThrough = function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let currentSection = document.querySelector(event.currentTarget.hash);
      if (currentSection) {
        currentSection.scrollIntoView({behavior: 'smooth'});
      }
    });
  };

  let initAnchors = function (links) {
    for (let i = 0; i < links.length; i++) {
      initScrollThrough(links[i]);
    }
  };

  initAnchors(anchorLinks);
})();

'use strict';

(function () {
  const feedbackModalElement = document.querySelector('.feedback--modal');
  const modalNameInputElement = feedbackModalElement && feedbackModalElement.querySelector('#feedback-name-modal');
  const openFeedbackModalElement = document.querySelector('.header__callback');

  const initModal = window.modal.init;

  const setFocus = () => {
    window.common.startActionWithCheck([modalNameInputElement], () => modalNameInputElement.focus());
  };

  window.common.startActionWithCheck([feedbackModalElement, openFeedbackModalElement], () => {
    initModal(feedbackModalElement, openFeedbackModalElement, setFocus);
  });

  window.checkWebpSupport();
})();
