'use strict';

angular.module('energyScannerApp')
  .directive('backButton', function () {
    return {
      template: '<span class="back-button-container" ui-sref="{{stateName}}"><span class="back-icon"></span><span ng-bind="label"></span></span>',
      restrict: 'EA',
      scope: {
        stateName: '@',
        label: '@'
      },
      link: function (scope, element, attrs) {

        scope.stateName = scope.stateName || 'intro';

      }
    };
  });
