'use strict';

angular.module('energyScannerApp')
  .directive('applianceRecord', function ($log) {
    return {
      templateUrl: 'app/directives/appliance_record/appliance_record.html',
      restrict: 'EA',
      scope: {
        record: '='
      },
      link: function (scope) {

        scope.$watch(function () {
          return scope.record && scope.record.scannedAt;
        }, function (scannedAt) {
          $log.info('record: ', scope.record);
          if (scannedAt) {
            scope.duration = scope.record.scannedAt.end - scope.record.scannedAt.start;
            scope.durationFormat = 'mm' + '분 ' + 'ss' + '초 동안 측정';
          }

        });
      }
    };
  });
