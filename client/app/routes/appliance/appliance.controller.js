'use strict';

angular.module('energyScannerApp')
  .controller('ApplianceCtrl', function ($scope, Appliance, $state, $log) {

    $scope.back = {
      stateName: 'scanEnergy',
      label: 'Scan Energy'
    };

    $scope.setAppliance = function (appl) {
      $scope.showSetting = true;
      $scope.selected = appl;

      $scope.back = {
        stateName: 'appliance',
        label: 'Appliance List'
      };
    };

    $scope.applianceIcon = {
      A1: '/assets/images/icon_refrigerator.png',
      A2: '/assets/images/icon_kimchirefrigerator.png',
      A3: '/assets/images/icon_washer.png',
      A4: '/assets/images/icon_ricepot.png',
      A5: '/assets/images/icon_etc.png'
    };

    $scope.init = function () {

      // GET Appliance API
      Appliance.getCode().success(function (response) {

        $scope.appliances = response;
        $scope.selected = {};

      }).error(function (response) {
        $log.error('Get appliance code: ', response);
      });

    };

    $scope.goToScanSetting = function () {
      $state.go('scanSetting', {
        appliance: angular.toJson($scope.selected)
      }, {
        location: false
      });
    };

  });
