(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('SearchByArtistController', SearchByArtistController);

  SearchByArtistController.$inject = ['DataService', '$routeParams', '$location'];

  function SearchByArtistController(DataService, $routeParams, $location) {
    var vm = this;

    DataService.init('g.searchByArtist');

    vm.searchTermChanged = function () {
      $location.path("/search-by-artist/" + vm.searchTerm);
    };

    vm.doSearch = function (term) {
      DataService.searchByArtist(term).then(function (response) {
        vm.titleList = response.data;
      });
    };

    if ($routeParams.artist != null) {
      vm.searchTerm = $routeParams.artist;
      vm.doSearch(vm.searchTerm);
    } else {
      vm.searchTerm = "";
    }
    //jq("#searchTerm").focus();
  }
})();