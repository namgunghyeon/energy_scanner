'use strict';

angular.module('energyScannerApp')
  .directive('analysisChart', function () {
    return {
      templateUrl: 'app/directives/analysis_chart/analysis_chart.html',
      restrict: 'EA',
      scope: {
        height: '@',
        data: '='
      },
      link: function (scope, element, attrs) {

        scope.isLoading = false;

        scope.render = function (data) {

          var target = element.find('#analysis-chart');

          target.highcharts('StockChart', {
            credits: {
              enabled: false
            },
            chart: {
              type: 'line',
              height: scope.height,
              events: {
                load: function () {
                  scope.isLoading = false;
                }
              }
            },
            rangeSelector : {
              selected : 1
            },

            title : {
              enabled: false
            },

            plotOptions: {
              series: {
                turboThreshold: 3600
              }
            },

            series : [{
              name : 'Scan data',
              data : data,
              tooltip: {
                valueDecimals: 2
              }
            }],

            yAxis: {
              title: {
                text: 'W',
                align: 'high',
                textAlign: 'left',
                rotation: 0
              }
            }
          });
        };

        scope.$watch('data', function (data) {

          if (data && data.length) {
            scope.render(data);
          }

        });

      }
    };
  });
