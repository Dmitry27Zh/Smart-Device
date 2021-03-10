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
