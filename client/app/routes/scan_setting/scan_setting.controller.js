'use strict';

angular.module('energyScannerApp')
  .controller('ScanSettingCtrl', function ($scope, appliance, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.appliance = appliance;

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

    };

  });
