(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('AboutController', AboutController);

  AboutController.$inject = ['DataService'];

  function AboutController(DataService) {
    var vm = this;

    DataService.init('pageTitle.about');

  }
})();