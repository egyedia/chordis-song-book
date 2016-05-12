(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('SearchQuickController', SearchQuickController);

  SearchQuickController.$inject = ['DataService', '$routeParams', '$location'];

  function SearchQuickController(DataService, $routeParams, $location) {
    var vm = this;

    DataService.init();

    vm.searchTermChanged = function () {
      $location.path("/" + vm.searchTerm);
    };

    vm.doSearch = function (term) {
      DataService.searchQuick(term).then(function (response) {
        vm.searchResults = response.data;
      });
    };

    if ($routeParams.term != null) {
      vm.searchTerm = $routeParams.term;
      vm.doSearch(vm.searchTerm);
    } else {
      vm.searchTerm = "";
    }
    jq("#searchTerm").focus();
  }
})();