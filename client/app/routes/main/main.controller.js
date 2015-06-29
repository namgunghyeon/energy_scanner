'use strict';

angular.module('energyScannerApp')
  .controller('MainCtrl', function ($scope, Scanner, $state) {

    $scope.scanner = Scanner;

    $scope.goToScanView = function () {

      if ($scope.scanner.isScanning) {
        $state.go('scanSetting', {
          appliance: angular.toJson($scope.scanner.appliance)
        }, {
          location: false
        });
      } else {
        $state.go('scanEnergy');
      }

    };

  });
