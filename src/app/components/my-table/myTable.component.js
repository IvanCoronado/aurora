(function() {
    'use strict';

    angular
        .module('aurora')
        .component('myTable', {
            templateUrl: 'app/components/my-table/my-table.tpl.html',
            bindings:{
                head: '<',
                values: '<'
            }
        });
})();