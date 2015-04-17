'use strict';

angular.module('energyScannerApp')
  .directive('myAppliance', function ($state) {
    return {
      templateUrl: 'app/directives/my_appliance/my_appliance.html',
      restrict: 'EA',
      scope: {
        applianceId: '@'
      },
      link: function (scope, element, attrs) {

        scope.record = {
          scanId: 0,
          name: '냉장고',
          model: 'R-U956VBLB',
          scannedAt: {
            start: Date.now() - 300000,
            end: Date.now()
          },
          totalUsage: 176,
          data: []
        };

        scope.goDetail = function (applianceId) {

          if (applianceId && parseInt(applianceId, 10) > -1) {
            $state.go('myApplianceDetail', {
              applianceId: applianceId
            }, {
              location: false
            });
          } else {
            throw Error('appliance id required');
          }

        };

      }
    };
  });
