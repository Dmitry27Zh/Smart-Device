'use strict';

(function () {
  const feedbackModalElement = document.querySelector('.feedback--modal');
  const modalNameInputElement = feedbackModalElement.querySelector('#feedback-name-modal');
  const openFeedbackModalElement = document.querySelector('.header__callback');

  const initModal = window.modal;
  initModal(feedbackModalElement, openFeedbackModalElement, () => modalNameInputElement.focus());
})();
