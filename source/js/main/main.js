'use strict';

(function () {
  const pageTelInputElement = document.querySelector('#feedback-tel');
  const feedbackModalElement = document.querySelector('.feedback--modal');
  const modalNameInputElement = feedbackModalElement.querySelector('#feedback-modal-name');
  const modalTelInputElement = feedbackModalElement.querySelector('#feedback-modal-tel');
  const openFeedbackModalElement = document.querySelector('.header__callback');

  const initPageTelValidation = window.validation(pageTelInputElement);
  initPageTelValidation();

  const initModalTelValidation = window.validation(modalTelInputElement);
  initModalTelValidation();

  const initModal = window.modal;
  initModal(feedbackModalElement, openFeedbackModalElement, () => modalNameInputElement.focus());
})();
