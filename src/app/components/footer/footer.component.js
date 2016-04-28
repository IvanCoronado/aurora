(function() {
  'use strict';

  angular
    .module('aurora')
    .component('myFooter', {
      templateUrl: 'app/components/footer/footer.tpl.html',
      controller: myFooterCtrl,
      bindings:{
        
      }
    });

  /* @ngInject */
  function myFooterCtrl() {
    
  }
})();