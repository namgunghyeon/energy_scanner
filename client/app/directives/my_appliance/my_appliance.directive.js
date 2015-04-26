'use strict';

angular.module('energyScannerApp')
  .directive('myAppliance', function ($state, ScanHistory, $log) {
    return {
      templateUrl: 'app/directives/my_appliance/my_appliance.html',
      restrict: 'EA',
      scope: {
        info: '='
      },
      link: function (scope, element, attrs) {

        scope.goDetail = function (scanId) {

          if (scanId && parseInt(scanId, 10) > -1) {
            $state.go('myApplianceDetail', {
              scanId: scanId
            }, {
              location: false
            });
          } else {
            throw Error('appliance id required');
          }

        };

        scope.render = function (data) {

          element.find('.scan-graph').highcharts({
            credits: {
              enabled: false
            },
            chart: {
              type: 'line',
              height: 120
            },
            exporting: {
              enabled: false
            },
            title: {
              enabled: false,
              text: ''
            },
            xAxis: {
              allowDecimals: false,
              labels: {
                enabled: false
              },
              lineWidth: 0,
              tickLength: 0,
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: ''
              },
              labels: {
                enabled: false
              },
              gridLineWidth: 0,
              minorGridLineWidth: 0
            },
            plotOptions: {
              line: {
                marker: {
                  enabled: false
                }
              }
            },
            series: [
              {
                name: scope.record.name || 'Appliance',
                data: data
              }
            ],
            tooltip: {
              enabled: false
            },
            legend: {
              enabled: false
            }
          });

        };

        scope.init = function (info) {

          scope.record = {
            scanId: info.scan_id,
            name: info.name,
            model: info.model,
            mode: info.mode1 || info.mode2,
            scannedAt: {
              start: info.start,
              end: info.end
            },
            totalUsage: info.totalUsage
          };
          debugger;
          ScanHistory.getScanRawData(info.scan_id).success(function (response) {

            if (response.code === 200) {
              scope.render(response.detail.data || []);
            }

          }).error(function (response) {
            $log.error('Get scan raw data: ', response);
          });

        };

        scope.$watch('info', function (info) {

          if (info) {
            scope.init(info);
          }

        }, true);

      }
    };
  });
