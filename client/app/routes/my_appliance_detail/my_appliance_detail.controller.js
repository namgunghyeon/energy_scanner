'use strict';

angular.module('energyScannerApp')
  .controller('MyApplianceDetailCtrl', function ($scope, applianceId, User, $state, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
    }

    $scope.back = {
      stateName: 'scanHistory',
      label: 'My Appliances'
    };

    $scope.goToScan = function () {
      $state.go('scanEnergy', {
        applianceId: applianceId
      }, {
        location: false
      });
    };

    $scope.record = {
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

  });
