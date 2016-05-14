(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('TitleListController', TitleListController);

  TitleListController.$inject = ['DataService'];

  function TitleListController(DataService) {
    var vm = this;

    DataService.init('g.titleList');

    DataService.loadTitles().then(function (response) {
      vm.titleList = response.data;
    });
  }
})();