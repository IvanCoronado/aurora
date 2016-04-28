(function() {
    'use strict';

    angular
      .module('aurora')
      .factory('dataService', dataServiceFactory);

    /* @ngInject */
    function dataServiceFactory($q) {
        var service = {
            getData: getData,
            getTableCompatibleData: getTableCompatibleData,
            getNvd3CompatibleData: getNvd3CompatibleData
        };

        return service;

        function getData() {
            var deferred = $q.defer();
  
            d3.csv("/assets/data/Data2.csv")
                .get(function(error, rows) { 
                    if(angular.isObject(error)){
                        deferred.reject(error);
                    }else{
                        deferred.resolve(rows)
                    } 
                });

            return deferred.promise;
        }

        function getTableCompatibleData(data){
            var keys, values, tableData;
            keys = _.chain(data).first().keysIn().value();
            values = _.chain(data).map(function(row){
                return _.values(row);
            }).value();

            tableData = {
                head : keys,
                values : values
            }
            
            return tableData;
        }

        function getNvd3CompatibleData(data) {
            var keys, series;

            keys = _.chain(data).first().omit('Date').keysIn().value();
                                   
            series = getSeriesKeys();
            initSeriesValues(series, data);

            return series;

            function getSeriesKeys(){
                var temporalSeries = [];

                _.map(keys, function(key){
                    var serie = {
                        key: key,
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
    }
})();