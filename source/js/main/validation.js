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
