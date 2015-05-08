'use strict';

angular.module('energyScannerApp')
  .controller('ScanEnergyCtrl', function ($scope, Device, User, $interval, $state, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
      return;
    }

    $scope.back = {
      stateName: 'main',
      label: 'Home'
    };

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

        $scope.isActive = true;


      }).error(function (response) {
        $log.error('Get devices: ', response);
      });

    };

  });
