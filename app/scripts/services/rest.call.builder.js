(function () {
  'use strict';

  angular
      .module('csbApp')
      .service('RestCallBuilder', RestCallBuilder);

  RestCallBuilder.$inject = ['$http'];

  function RestCallBuilder($http) {

    var service = {};

    service.method = function (method, url, data) {
      var req = {
        "method" : method,
        "url"    : url,
        "data"   : data
      };
      return $http(req);
    };

    service.get = function (url) {
      return this.method("GET", url, null);
    };

    service.delete = function (url) {
      return this.method("DELETE", url, null);
    };

    service.post = function (url, data) {
      return this.method("POST", url, data);
    };

    service.put = function (url, data) {
      return this.method("PUT", url, data);
    };

    return service;
  };
})();
