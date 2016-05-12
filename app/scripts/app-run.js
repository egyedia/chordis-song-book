(function () {
  'use strict';

  angular
      .module('csbApp')
      .run(run);

  run.$inject = ['$rootScope', '$document', '$window', 'KeyService'];

  function run($rootScope, $document, $window, KeyService) {

    var bindTo = $document;

    bindTo.bind('keydown', function (e) {
      var te = {};
      te.which = e.which;

      te.metaKey = e.metaKey;
      te.shiftKey = e.shiftKey;
      te.ctrlKey = e.ctrlKey;
      te.altKey = e.altKey;

      KeyService.event(te);
    });


    $rootScope.fluid = false;
  }
})();