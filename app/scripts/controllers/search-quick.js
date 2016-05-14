(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('SearchQuickController', SearchQuickController);

  SearchQuickController.$inject = ['DataService', '$routeParams', '$location'];

  function SearchQuickController(DataService, $routeParams, $location) {
    var vm = this;

    DataService.init('g.searchQuick');

    vm.searchTermChanged = function () {
      $location.path("/" + vm.searchTerm);
      $location.search({"exactMatch": vm.exactMatch});
    };

    vm.doSearch = function (term) {
      var searchTerm = term;
      if (vm.exactMatch) {
        searchTerm = '"' + searchTerm + '"';
      }
      DataService.searchQuick(searchTerm).then(function (response) {
        vm.titleList = response.data;
      });
    };

    vm.exactMatch = false;
    var searchObject = $location.search();
    if (searchObject.hasOwnProperty('exactMatch') && searchObject.exactMatch) {
      vm.exactMatch = true;
    }

    if ($routeParams.term != null) {
      vm.searchTerm = $routeParams.term;
      vm.doSearch(vm.searchTerm);
    } else {
      vm.searchTerm = "";
    }
    //jq("#searchTerm").focus();
  }
})();