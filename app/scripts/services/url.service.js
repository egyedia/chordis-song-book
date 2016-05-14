(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('UrlService', UrlService);

  UrlService.$inject = ['$http', '$location'];

  function UrlService($http, $location) {

    //var baseUrl = 'http://chordis-api.dubylon.com/';
    var baseUrl = 'http://chordis-api.dubylon.comx:2222/';
    var service = {};

    service.loadArtists = function () {
      return baseUrl + 'index.php?page=ArtistListData';
    };

    service.loadTitles = function () {
      return baseUrl + 'index.php?page=TitleListData';
    };

    service.loadRatings = function () {
      return baseUrl + 'index.php?page=RatingListData';
    };

    service.loadFolderAndFileTree = function () {
      return baseUrl + 'index.php?page=FolderAndFileTreeData';
    };

    service.searchQuick = function (term) {
      return baseUrl + 'index.php?page=SearchQuickData&term=' + encodeURI(term);
    };

    service.searchByArtist = function (artist) {
      return baseUrl + 'index.php?page=SongsByArtistData&artist=' + encodeURI(artist);
    };

    service.reindex = function () {
      return baseUrl + 'index.php?page=ReindexData';
    };

    service.reindexStatus = function () {
      return baseUrl + 'index.php?page=ReindexStatusData';
    };

    service.song = function (songId) {
      return baseUrl + 'index.php?page=SongData&id=' + songId;
    };

    service.rating = function (hash, rating) {
      return baseUrl + 'index.php?page=RatingData&hash=' + hash + "&rating=" + rating;
    };

    return service;

  };
})();