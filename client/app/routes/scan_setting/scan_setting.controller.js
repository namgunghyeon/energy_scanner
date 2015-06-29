'use strict';

angular.module('energyScannerApp')
  .controller('ScanSettingCtrl', function ($scope, appliance, Scanner, User, $state, $timeout, $window, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
      return;
    }

    $scope.back = {
      stateName: 'main',
      label: 'Home'
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

      if (!$scope.scanner.isScanning) {
        $scope.scanner.init();
      }

      $scope.chart = {
        mode: 'scan',
        isActive: true
      };

      $scope.scanStart = function (option) {

        if (option.id === 'timer') {
          $timeout($scope.scanComplete, option.minutes * 60000);
        } else {
          $timeout($scope.scanComplete, 7200000);
        }

        $window.alert('스캔은 최대 2시간까지 가능합니다!');
        $scope.scanner.start($scope.appliance);
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
