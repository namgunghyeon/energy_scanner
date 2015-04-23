'use strict';

angular.module('energyScannerApp')
  .controller('ScanSettingCtrl', function ($scope, appliance, Scanner, $state, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.recordOptions = [
      {
        id: 'continue',
        name: '연속 스캔'
      },
      {
        id: 'timer',
        name: '타이머 설정',
        minutes: 1
      }
    ];

    $scope.init = function () {

      $scope.selected = {
        option: $scope.recordOptions[0]
      };

      $scope.appliance = appliance;
      $scope.scanner = Scanner;
      $scope.scanner.init();

      $scope.scanComplete = function () {

        $scope.scanner.stop();

        $state.go('scanResult', {
          appliance: angular.toJson($scope.appliance)
        }, {
          location: false
        });
      };

    };

  });
