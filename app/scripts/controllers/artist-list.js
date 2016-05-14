(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('ArtistListController', ArtistListController);

  ArtistListController.$inject = ['DataService'];

  function ArtistListController(DataService) {
    var vm = this;

    DataService.init('g.artistList');

    DataService.loadArtists().then(function (response) {
      vm.artistList = response.data;
    });
  }
})();