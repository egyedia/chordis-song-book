(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('ShortcutsController', ShortcutsController);

  ShortcutsController.$inject = ['DataService'];

  function ShortcutsController(DataService) {
    var vm = this;

    DataService.init('g.shortcuts');

  }
})();