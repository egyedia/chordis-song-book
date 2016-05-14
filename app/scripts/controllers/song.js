(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('SongController', SongController);

  SongController.$inject = ['DataService', '$routeParams', '$anchorScroll', '$timeout', '$rootScope',
                            'localStorageService', 'SongService'];

  function SongController(DataService, $routeParams, $anchorScroll, $timeout, $rootScope, localStorageService,
                          SongService) {
    var vm = this;

    vm.fontChangeRatio = 1.03;
    vm.chordSpaceRatio = 0.3;

    DataService.init();

    $rootScope.songController = this;

    vm.scrollToTop = function () {
      $anchorScroll('songContainerTop');
    };

    vm.increaseSongFont = function () {
      vm.songFontSize *= vm.fontChangeRatio;
      vm.saveState();
    };

    vm.resetSongFont = function () {
      vm.songFontSize = 1;
      vm.saveState();
    };

    vm.decreaseSongFont = function () {
      vm.songFontSize /= vm.fontChangeRatio;
      vm.saveState();
    };

    vm.increaseChordFont = function () {
      vm.chordFontSize *= vm.fontChangeRatio;
      vm.saveState();
    };

    vm.resetChordFont = function () {
      vm.chordFontSize = 1;
      vm.saveState();
    };

    vm.decreaseChordFont = function () {
      vm.chordFontSize /= vm.fontChangeRatio;
      vm.saveState();
    };

    vm.switchSongTabSize = function () {
      vm.songTabSize = vm.songTabSize == 8 ? 4 : 8;
      vm.saveState();
      vm.songLoaded(vm.song);
    };

    vm.saveState = function () {
      localStorageService.set("songFontSize", vm.songFontSize);
      localStorageService.set("chordFontSize", vm.chordFontSize);
      localStorageService.set("chordLayerVisible", vm.chordLayerVisible);
      localStorageService.set("chordLayerPinned", vm.chordLayerPinned);
      localStorageService.set("songTabSize", vm.songTabSize);
    };

    vm.hideChordsLayer = function () {
      vm.chordLayerVisible = false;
      vm.saveState();
    };

    vm.showChordsLayer = function () {
      vm.chordLayerVisible = true;
      vm.saveState();
    };

    vm.toggleChordsLayer = function () {
      vm.chordLayerVisible = !vm.chordLayerVisible;
      vm.saveState();
    };

    vm.updateChordLayerPinned = function () {
      vm.chordLayerPosition = vm.chordLayerPinned ? 'fixed' : 'absolute'
    };

    vm.toggleChordLayerPinned = function () {
      vm.chordLayerPinned = !vm.chordLayerPinned;
      vm.updateChordLayerPinned();
      vm.saveState();
    };

    vm.setRating = function (r) {
      DataService.updateRating(this.song.hash, r).then(function (response) {
        vm.songLoaded(response.data);
      });
    };

    vm.loadSong = function (songId) {
      DataService.song(songId).then(function (response) {
        vm.songLoaded(response.data);
      });
    };

    vm.songLoaded = function (data) {
      vm.song = data;
      vm.content = SongService.parseSong(vm.song.content, vm.chordSpaceRatio, vm.songTabSize);
      $rootScope.pageTitle = vm.song.title;
      $timeout(function () {
        vm.scrollToTop();
      });
    }

    if ($routeParams.songId != null) {
      vm.loadSong($routeParams.songId);
    }

    vm.songFontSize = 1;
    var candidateSongSize = localStorageService.get("songFontSize");
    if (candidateSongSize != null) {
      vm.songFontSize = candidateSongSize;
    }

    vm.chordFontSize = 1.2;
    var candidateChordSize = localStorageService.get("chordFontSize");
    if (candidateChordSize != null) {
      vm.chordFontSize = candidateChordSize;
    }

    vm.chordLayerVisible = true;
    var candidateChordLayerVisible = localStorageService.get("chordLayerVisible");
    if (candidateChordLayerVisible != null) {
      vm.chordLayerVisible = candidateChordLayerVisible;
    }

    vm.chordLayerPinned = true;
    var candidateChordLayerPinned = localStorageService.get("chordLayerPinned");
    if (candidateChordLayerPinned != null) {
      vm.chordLayerPinned = candidateChordLayerPinned;
    }

    vm.songTabSize = 8;
    var candidateSongTabSize = localStorageService.get("songTabSize");
    if (candidateSongTabSize != null) {
      vm.songTabSize = candidateSongTabSize;
    }

    vm.updateChordLayerPinned();

  }
})();