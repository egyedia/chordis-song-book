(function () {
  'use strict';

  angular
      .module('csbApp')
      .filter('times', TimesFilter);

  TimesFilter.$inject = [];

  function TimesFilter() {
    return function (val, range) {
      range = parseInt(range);
      for (var i = 0; i < range; i++)
        val.push(i);
      return val;
    };
  };
})();
