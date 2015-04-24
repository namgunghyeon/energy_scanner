'use strict';

angular.module('energyScannerApp')
  .controller('ScanEnergyCtrl', function ($scope, applianceId, Device, User, $interval, $state, $log) {

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

        if ($scope.hasDevices) {

          User.setInfo({
            device_hash: $scope.devices[0].hash
          });

          $scope.render = $interval(function () {

            Device.getRealtimeUsage().success(function (response) {

              $log.info('realtime at ' + new Date(), response);

            }).error(function (response) {
              $log.error('Get realtime usage: ', response);
            });

          }, 2000, 5);

        }


      }).error(function (response) {
        $log.error('Get devices: ', response);
      });

    };

  });
