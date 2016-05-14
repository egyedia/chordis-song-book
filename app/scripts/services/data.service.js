(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('DataService', DataService);

  DataService.$inject = ['RestCallBuilder', 'UrlService', '$rootScope', '$translate'];

  function DataService(RestCallBuilder, UrlService, $rootScope, $translate) {

    var service = {};

    service.init = function (pageTitleKey) {
      $rootScope.songController = null;
      $rootScope.pageTitle = $translate.instant(pageTitleKey);
    };

    service.loadArtists = function () {
      return RestCallBuilder.get(UrlService.loadArtists());
    };

    service.loadTitles = function () {
      return RestCallBuilder.get(UrlService.loadTitles());
    };

    service.loadRatings = function () {
      return RestCallBuilder.get(UrlService.loadRatings());
    };

    service.loadFolderAndFileTree = function () {
      return RestCallBuilder.get(UrlService.loadFolderAndFileTree());
    };

    service.searchQuick = function (term) {
      return RestCallBuilder.get(UrlService.searchQuick(term));
    };

    service.searchByArtist = function (artist) {
      return RestCallBuilder.get(UrlService.searchByArtist(artist));
    };

    service.reindex = function (term) {
      return RestCallBuilder.get(UrlService.reindex());
    };

    service.reindexStatus = function (term) {
      return RestCallBuilder.get(UrlService.reindexStatus());
    };

    service.song = function (songId) {
      return RestCallBuilder.get(UrlService.song(songId));
    };

    service.updateRating = function (hash, rating) {
      var putData = {
	"hash": hash,
	"rating": rating
	};
      return RestCallBuilder.get(UrlService.rating(hash, rating));
    };

    return service;
  };
})();
