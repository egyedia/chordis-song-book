(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('ReindexDataController', ReindexDataController);

  ReindexDataController.$inject = ['DataService', '$translate', '$timeout'];

  function ReindexDataController(DataService, $translate, $timeout) {
    var vm = this;

    DataService.init();

    vm.reindexData = function () {
      if (confirm($translate.instant("g.reallyReindex"))) {
        vm.launchReindex();
      }
    };

    vm.launchReindex = function () {
      vm.reindexStarted = true;
      DataService.reindex().then(function (response) {
        vm.reindexResult = response.data;
      });
      $timeout(vm.readReindexStatus, 3000);
    };

    vm.readReindexStatus = function () {
      DataService.reindexStatus().then(function (response) {
        vm.reindexStatus = response.data;
        if (vm.reindexStatus.running) {
          $timeout(vm.readReindexStatus, 1000);
        }
      });
    }

    vm.reindexStarted = false;
    vm.reindexResult = {
      "updated": false
    };

  }
})();