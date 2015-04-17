'use strict';

angular.module('energyScannerApp')
  .controller('ScanEnergyCtrl', function ($scope, applianceId, User, $state) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
    }

    $scope.back = {
      stateName: 'main',
      label: 'Home'
    };

  });
