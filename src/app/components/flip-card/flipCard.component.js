(function() {
    'use strict';

    angular
        .module('aurora')
        .component('flipCard', {
              templateUrl: 'app/components/flip-card/flip-card.tpl.html',
              controller: flipCardCtrl,
              bindings:{
                data:'='
              }
        });

    /* @ngInject */
    function flipCardCtrl() {
        console.log(this.data);
    }
})();