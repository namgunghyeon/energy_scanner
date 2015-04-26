'use strict';

angular.module('energyScannerApp')
  .directive('realtimeChart', function (Device, Scanner, $interval, $rootScope) {
    return {
      templateUrl: 'app/directives/realtime_chart/realtime_chart.html',
      restrict: 'EA',
      scope: {
        isActive: '=',
        mode: '='
      },
      link: function (scope, element) {

        scope.isLoading = true;
        scope.height = 280;

        scope.render = function () {

          var target = element.find('#realtime-chart');

          target.highcharts({
            credits: {
              enabled: false
            },
            chart: {
              type: 'spline',
              marginRight: 10,
              height: scope.height,
              events: {
                load: function () {

                  var series = this.series[0],
                    intervalSeconds = 2000;

                  function job() {

                    Device.getRealtimeUsage().success(function (data) {

                      var markerNum = 15,
                        needShift = series.data.length === markerNum ? true : false;

                      series.addPoint([
                        data.timestamp,
                        data.active_power / 1000
                      ], true, needShift);

                      scope.isLoading = false;

                      if (scope.mode === 'scan') {
                        Scanner.store({
                          x: data.timestamp,
                          y: data.active_power / 1000
                        });
                      }

                    }).error(function (response) {
                      scope.isLoading = false;
                      $log.error('error: ', response);
                    });

                  }

                  job();

                  scope.update = $interval(job, intervalSeconds);

                  // 다른 state로 이동하는 경우 interval 해제
                  $rootScope.$on('$stateChangeStart', function (e, toState) {

                    if (toState.name !== 'main.realtime') {
                      $interval.cancel(scope.update);
                      scope.update = undefined;
                    }
                  });
                }
              }
            },
            plotOptions: {
              spline: {
                color: '#33485d',
                lineWidth: 3,
                marker: {
                  fillColor: '#46cbea',
                  lineColor: '#33485d',
                  lineWidth: 3,
                  radius: 5
                }
              }
            },
            title: {
              margin: 0,
              text: '.',
              style: {
                color: '#fff',
                fontSize: '10px'
              }
            },
            xAxis: {
              labels: {
                style: {
                  'color': '#33485d',
                  'fontSize': '0.85em'
                }
              },
              lineColor: '#33485d',
              lineWidth: 2,
              type: 'datetime',
              tickPixelInterval: 69,
              units: [
                [
                  'second',
                  [5, 10]
                ]
              ]
            },
            yAxis: {
              gridLineWidth: 0,
              labels: {
                style: {
                  'color': '#62727a',
                  'fontSize': '0.85em'
                }
              },
              plotBands: [{
                color: '#33485d',
                thickness: 3
              }],
              title: {
                align: 'high',
                offset: 18,
                rotation: 0,
                style: {
                  'color': '#62727a',
                  'fontSize': '0.85em'
                },
                text: 'W',
                y: -10
              },
              tickInterval: 10
            },
            tooltip: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            exporting: {
              enabled: false
            },
            series: [{
              name: 'Real time data',
              data: []
            }]
          });
        };

        scope.$watch('isActive', function (isActive) {

          if (isActive) {
            scope.render();
          }

        });

      }
    };
  });
