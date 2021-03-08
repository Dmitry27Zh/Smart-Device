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

  console.log(window.smoothscroll);
})();
