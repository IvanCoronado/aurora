(function() {
  'use strict';

  angular
    .module('aurora')
    .factory('dataService', dataServiceFactory);

  /* @ngInject */
  function dataServiceFactory() {
    var service = {
      getData: getData
    };

    return service;

    function getData() {
      
    }
  }
})();