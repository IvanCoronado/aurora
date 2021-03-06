(function() {
    'use strict';

    angular
        .module('aurora')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(dataService) {
        var vm = this,
        format = d3.time.format("%m/%d/%Y");

        vm.showTable = true;
        vm.exportSvgAsImg = exportSvgAsImg;

        init();

        function init(){
            dataService.getData().then(function(data){
                vm.nvd3Data = dataService.getNvd3CompatibleData(data);
                vm.tableData = dataService.getTableCompatibleData(data); 
            });
        }

        vm.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){ return new Date(d.x); },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                xAxis: {
                    tickFormat: function(d){
                        return d3.time.format('%b %d')( new Date(d));
                    },
                },
                yAxis: {
                    axisLabelDistance: -10
                }
            }
        };

        function exportSvgAsImg(){
            saveSvgAsPng(document.getElementsByTagName("svg")[0], "diagram.png");
        }
    }
})();
