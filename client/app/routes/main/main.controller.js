'use strict';

angular.module('energyScannerApp')
  .controller('MainCtrl', function ($scope, Scanner, $state, $interval, $log) {

    $scope.scanner = Scanner;

    if ($scope.scanner.isScanning) {
      $interval(function () {
        $log.info('scanner: ', Scanner);
      }, 5000);
    }

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
