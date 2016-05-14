(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('RatingListController', RatingListController);

  RatingListController.$inject = ['DataService'];

  function RatingListController(DataService) {
    var vm = this;

    DataService.init('g.ratingList');

    DataService.loadRatings().then(function (response) {
      vm.titleList = response.data;
    });
  }
})();