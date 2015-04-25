'use strict';

angular.module('energyScannerApp')
  .controller('ScanResultCtrl', function ($scope, appliance, Scanner, $state, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.init = function () {
      $scope.appliance = appliance;
      $scope.scanner = Scanner;

      $scope.backToScanSetting = function () {
        $state.go('scanSetting', {
          appliance: angular.toJson(appliance)
        }, {
          location: false
        });
      };

      $scope.saveScanHistory = function () {

        $scope.scanner.save(appliance);
        $state.go('main');

      };
    };

  });
