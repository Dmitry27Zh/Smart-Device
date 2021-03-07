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
