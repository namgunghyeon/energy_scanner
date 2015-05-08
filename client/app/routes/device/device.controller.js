'use strict';

angular.module('energyScannerApp')
  .controller('DeviceCtrl', function ($scope, Device, User, $state, $window, $log) {

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
    };

    $scope.goToScanEnergy = function () {

      if ($scope.selected.device) {
        User.setInfo({
          device_hash: $scope.selected.device.hash
        });

        $state.go('scanEnergy');

      } else {
        $window.alert('디바이스를 선택해주세요!');
      }

    };

    $scope.init = function () {

      var selectedDeviceHash = User.getInfo().device_hash;

      $scope.newDevice = {};
      $scope.showRegisterForm = false;
      $scope.selected = {};

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

        angular.forEach($scope.devices, function (device) {
          if (selectedDeviceHash === device.hash) {
            $scope.selected.device = device;
          }
        });

      }).error(function (response) {
        $log.error('Get devices: ', response);
      });
    };

  });
