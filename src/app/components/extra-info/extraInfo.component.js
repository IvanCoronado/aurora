(function() {
  'use strict';

  angular
    .module('aurora')
    .component('myExtraInfo', {
      templateUrl: 'app/components/extra-info/extra-info.tpl.html',
      controller: myExtraInfoCtrl,
      bindings:{
        
      }
    });

  /* @ngInject */
  function myExtraInfoCtrl() {
    
  }
})();