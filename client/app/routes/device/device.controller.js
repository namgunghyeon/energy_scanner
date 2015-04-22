'use strict';

angular.module('energyScannerApp')
  .controller('DeviceCtrl', function ($scope, Device, User, $window, $log) {

    $scope.back = {
      stateName: 'scanEnergy',
      label: 'Scan Energy'
    };

    $scope.register = {
      cancel: function () {
        $scope.showRegisterForm = false;
        $scope.newDevice = {};
      },
      confirm: function (newDevice) {

        if (Object.keys(newDevice).length === 2) {

          newDevice.hash = 'dbe711ffa537b83b135f37fd64c309682985fd53';

          Device.setDevice(newDevice).success(function (response) {

            if (response === 200 || response === '200') {
              //$scope.devices.push(newDevice);
              $scope.init();
            } else {
              throw Error('Set device failed');
            }

          }).error(function (response) {
            $log.error('Set device: ', response);
          });
        } else {
          $window.alert('등록할 디바이스 정보를 입력해주세요.');
        }
      }
    };

    $scope.addNewDeviceForm = function () {
      $scope.showRegisterForm = true;
      $scope.newDevice = {};
    };

    $scope.selectDevice = function (device) {
      $scope.selected.device = device;

      User.setInfo({
        device_hash: $scope.selected.device.hash
      });
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

        $scope.selected = {
          device: $scope.devices[0] || {}
        };

        User.setInfo({
          device_hash: $scope.selected.device.hash
        });

      }).error(function (response) {
        $log.error('Get devices: ', response);
      });
    };

  });
