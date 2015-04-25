'use strict';

angular.module('energyScannerApp')
  .directive('loader', function () {
    return {
      templateUrl: 'app/directives/loader/loader.html',
      restrict: 'EA',
      scope: {
        loading: '=',
        height: '@'
      },
      link: function (scope, element, attrs) {

      }
    };
  });
