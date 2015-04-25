'use strict';

angular.module('energyScannerApp')
  .controller('ScanSettingCtrl', function ($scope, appliance, Scanner, User, $state, $timeout, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
      return;
    }

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

      $scope.scanStart = function (option) {

        $scope.chart = {
          mode: 'scan',
          isActive: true
        };

        if (option.id === 'timer') {
          $timeout($scope.scanComplete, option.minutes * 60000);
        }

        $scope.scanner.start(option);
      };

      $scope.scanComplete = function () {

        $scope.chart.isActive = false;
        $scope.scanner.stop();

        $state.go('scanResult', {
          appliance: angular.toJson($scope.appliance)
        }, {
          location: false
        });
      };

    };

  });
