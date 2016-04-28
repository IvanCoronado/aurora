(function() {
  'use strict';

  angular
    .module('aurora')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
  	var vm = this;
    d3.csv("/assets/data/Data2.csv")
        .get(function(error, rows) { vm.data = parseToNvd3CompatibleData(rows) });

        function parseToNvd3CompatibleData(data) {
                var keys, series;

                keys = _.chain(data).drop().first().omit('Date').value();
                                               
                series = getSeriesKeys();
                initSeriesValues(series, data);

                console.log(series);
                return series;

                function getSeriesKeys(){
                    var temporalSeries = [];

                    _.forEach(keys, function(key, index){
                        var serie = {
                            key: index,
                            values: []
                        };
                        temporalSeries.push(serie);
                    })
                    return temporalSeries;
                }

                function initSeriesValues(series, data){
                    _.map(data, function(row){
                        _.map(series, function(serie){
                            var seriePoint = {
                                x: moment(row.Date, "DD/MM/YYYY").add(7,'days').toDate(),
                                y: _.chain(row).get(serie.key).replace(',','.').parseInt().value()
                            };
                            serie.values.push(seriePoint);
                        })
                    })
                }
            }

    var format = d3.time.format("%m/%d/%Y");
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
                axisLabel: 'Day'
            },
            yAxis: {
                axisLabel: 'Consumo',
                tickFormat: function(d){
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            }
        }
    };
      
  }
})();
