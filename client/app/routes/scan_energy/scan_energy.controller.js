'use strict';

angular.module('energyScannerApp')
  .controller('ScanEnergyCtrl', function ($scope, applianceId, Device, User, $state, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
      return;
    }

    $scope.back = {
      stateName: 'main',
      label: 'Home'
    };

    $scope.hasDevices = true;

    $scope.init = function () {

      Device.getDevices().success(function (devices) {

        $scope.devices = [];

        angular.forEach(devices, function (device) {
          $scope.devices.push({
            serial: device.serial,
            hash: device.device_hash,
            label: device.label || 'iMAC'
          });
        });

        $scope.hasDevices = !!$scope.devices.length;

        if (!User.getInfo().device_hash) {
          User.setInfo({
            device_hash: ($scope.devices[0] && $scope.devices[0].hash) || ''
          });
        }

      }).error(function () {
        $log.error('Get devices: ', response);
      });

    };

  });
