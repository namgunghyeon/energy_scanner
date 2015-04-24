'use strict';

angular.module('energyScannerApp')
  .directive('analysisChart', function () {
    return {
      templateUrl: 'app/directives/analysis_chart/analysis_chart.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });