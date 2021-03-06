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
