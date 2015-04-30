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

        if (newDevice.serial) {

          Device.getHash(newDevice.serial).then(function (response) {

            newDevice.hash = response.hash;

            Device.setDevice(newDevice).success(function (response) {

              if (response === 200 || response === '200') {
                $scope.init();
              } else {
                throw Error('Set device failed');
              }

            }).error(function (response) {
              $log.error('Set device: ', response);
            });

          }).catch(function (response) {
            $window.alert('디바이스 등록 중 에러가 발생했습니다.');
            $log.error('Device get hash: ', response);
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

      $scope.newDevice = {};
      $scope.showRegisterForm = false;

      Device.getDevices().success(function (devices) {

        $scope.devices = [];

        angular.forEach(devices, function (device) {
          $scope.devices.push({
            serial: device.serial,
            hash: device.device_hash,
            label: device.label
          });
        });

        $scope.hasDevices = !!$scope.devices.length;

        $scope.selected = {
          device: $scope.devices[0] || {}
        };

      }).error(function (response) {
        $log.error('Get devices: ', response);
      });
    };

  });
