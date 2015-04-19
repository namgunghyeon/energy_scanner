'use strict';

angular.module('energyScannerApp')
  .directive('backButton', function ($state) {
    return {
      template: '<span class="back-button-container" ng-click="goToState()"><span class="back-icon"></span><span ng-bind="label"></span></span>',
      restrict: 'EA',
      scope: {
        stateName: '=',
        label: '@'
      },
      link: function (scope, element, attrs) {

        scope.stateName = scope.stateName || 'intro';

        scope.goToState = function () {
          $state.go(scope.stateName, {}, {
            reload: true
          });
        };

      }
    };
  });
