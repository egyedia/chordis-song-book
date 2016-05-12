(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('DataService', DataService);

  DataService.$inject = ['RestCallBuilder', 'UrlService', '$rootScope'];

  function DataService(RestCallBuilder, UrlService, $rootScope) {

    var service = {};

    service.init = function () {
      $rootScope.songController = null;
    };

    service.loadArtists = function () {
      return RestCallBuilder.get(UrlService.loadArtists());
    };

    service.loadTitles = function () {
      return RestCallBuilder.get(UrlService.loadTitles());
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

    return service;
  };
})();
