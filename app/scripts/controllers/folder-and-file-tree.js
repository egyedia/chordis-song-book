(function () {
  'use strict';

  angular
      .module('csbApp')
      .controller('FolderAndFileTreeController', FolderAndFileTreeController);

  FolderAndFileTreeController.$inject = ['DataService', '$routeParams', '$anchorScroll', '$location', '$timeout'];

  function FolderAndFileTreeController(DataService, $routeParams, $anchorScroll, $location, $timeout) {
    var vm = this;

    DataService.init();

    vm.candidateLocation = null;

    DataService.loadFolderAndFileTree().then(function (response) {
      var treeData = response.data;

      ﻿jq('#jsTree').jstree({
        "core"   : {
          "themes": {
            //"variant": "large"
          },
          'data'  : treeData
        },
        "plugins": []
      });

      jq('#jsTree').on("changed.jstree", function (e, data) {
        if (data.hasOwnProperty(('selected'))) {
          if (data.selected.length > 0) {
            var id = data.selected[0];
            if (id.substr(0, 1) == 'S') {
              var url = '/song/' + id.substr(1);
              $timeout(function () {
                $location.path(vm.candidateLocation);
                $timeout(function () {
                  $location.path(url);
                });
              });
            } else {
              var url = '/browse/' + id.substr(1);
              vm.candidateLocation = url;
            }
          }
        }

      });

      jq('#jsTree').bind("select_node.jstree", function (e, data) {
        return data.instance.toggle_node(data.node);
      });

      jq('#jsTree').bind("ready.jstree", function (e, data) {
        if ($routeParams.folderId != null) {
          var idToOpen = "F" + $routeParams.folderId;
          jq("#jsTree").jstree("select_node", "#" + idToOpen);
          $anchorScroll(idToOpen);
        }
      });


    });
  }
})();