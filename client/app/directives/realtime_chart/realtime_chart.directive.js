'use strict';

angular.module('energyScannerApp')
  .directive('realtimeChart', function () {
    return {
      templateUrl: 'app/directives/realtime_chart/realtime_chart.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });