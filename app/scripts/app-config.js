(function () {
  'use strict';

  angular
      .module('csbApp')
      .config(config);

  config.$inject = ['$routeProvider', '$locationProvider', '$translateProvider'];

  function config($routeProvider, $locationProvider, $translateProvider) {
    $routeProvider
        .when('/', {
          templateUrl : 'views/search-quick.html',
          controller  : 'SearchQuickController',
          controllerAs: 'vm'
        })
        .when('/search-by-artist', {
          templateUrl : 'views/search-by-artist.html',
          controller  : 'SearchByArtistController',
          controllerAs: 'vm'
        })
        .when('/search-by-artist/:artist*', {
          templateUrl : 'views/search-by-artist.html',
          controller  : 'SearchByArtistController',
          controllerAs: 'vm'
        })
        .when('/browse', {
          templateUrl : 'views/folder-and-file-tree.html',
          controller  : 'FolderAndFileTreeController',
          controllerAs: 'vm'
        })
        .when('/browse/:folderId*', {
          templateUrl : 'views/folder-and-file-tree.html',
          controller  : 'FolderAndFileTreeController',
          controllerAs: 'vm'
        })
        .when('/artist-list', {
          templateUrl : 'views/artist-list.html',
          controller  : 'ArtistListController',
          controllerAs: 'vm'
        })
        .when('/title-list', {
          templateUrl : 'views/title-list.html',
          controller  : 'TitleListController',
          controllerAs: 'vm'
        })
        .when('/rating-list', {
          templateUrl : 'views/rating-list.html',
          controller  : 'RatingListController',
          controllerAs: 'vm'
        })
        .when('/reindex-data', {
          templateUrl : 'views/reindex-data.html',
          controller  : 'ReindexDataController',
          controllerAs: 'vm'
        })
        .when('/song/:songId*', {
          templateUrl : 'views/song.html',
          controller  : 'SongController',
          controllerAs: 'vm'
        })
        .when('/:term*', {
          templateUrl : 'views/search-quick.html',
          controller  : 'SearchQuickController',
          controllerAs: 'vm'
        })

        .otherwise({
          redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/i18n/locale-',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }
})();