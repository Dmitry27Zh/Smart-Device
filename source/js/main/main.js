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
