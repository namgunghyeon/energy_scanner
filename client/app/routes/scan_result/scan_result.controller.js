'use strict';

angular.module('energyScannerApp')
  .controller('ScanResultCtrl', function ($scope, appliance, Scanner, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.init = function () {
      $scope.appliance = appliance;
      $scope.scanner = Scanner;
    };

  });
