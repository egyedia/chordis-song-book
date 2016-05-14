(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('KeyService', KeyService);

  KeyService.$inject = ['$rootScope', '$timeout'];

  function KeyService($rootScope, $timeout) {

    var service = {};

    service.event = function (e) {
      if ($rootScope.songController != null) {
        if (!e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
          if (e.which == 81) {
            $timeout(function () {
              $rootScope.songController.increaseSongFont();
            });
          } else if (e.which == 69) {
            $timeout(function () {
             $rootScope.songController.decreaseSongFont();
            });
          } else if (e.which == 87) {
            $timeout(function () {
              $rootScope.songController.resetSongFont();
            });
          } else if (e.which == 65) {
            $timeout(function () {
              $rootScope.songController.increaseChordFont();
            });
          } else if (e.which == 68) {
            $timeout(function () {
              $rootScope.songController.decreaseChordFont();
            });
          } else if (e.which == 83) {
            $timeout(function () {
              $rootScope.songController.resetChordFont();
            });
          } else if (e.which == 82) {
            $timeout(function () {
              $rootScope.songController.resetChordFont();
              $rootScope.songController.resetSongFont();
            });
          } else if (e.which == 84) {
            $timeout(function () {
              $rootScope.songController.scrollToTop();
            });
          } else if (e.which == 67) {
            $timeout(function () {
              $rootScope.songController.toggleChordsLayer();
            });
          } else if (e.which == 66) {
            $timeout(function () {
              $rootScope.songController.switchSongTabSize();
            });
          } else if (e.which >= 48 && e.which <= 53) {
            $timeout(function () {
              $rootScope.songController.setRating(e.which-48);
            });
          }
        }

      }
    };

    return service;
  };
})();
