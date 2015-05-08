'use strict';

angular.module('energyScannerApp')
  .controller('ScanResultCtrl', function ($scope, appliance, Scanner, User, $state, $window, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.init = function () {
      $scope.appliance = appliance;
      $scope.scanner = Scanner;
      $scope.rawData = $scope.scanner.datastore;

      $scope.backToScanSetting = function () {

        var yes = $window.confirm('스캔된 데이터가 있습니다. 취소하시겠습니까?');

        if (!yes) {
          return;
        }

        $state.go('scanSetting', {
          appliance: angular.toJson(appliance)
        }, {
          location: false
        });
      };

      $scope.saveScanHistory = function () {

        var userInfo = User.getInfo();
        appliance.userDeviceId = userInfo.device_id;

        $scope.scanner.saveHistory(appliance).then(function (response) {

          if (response.code === 200 || response.code === '200') {
            $window.alert('스캔 데이터가 저장되었습니다.');

            if (response.detail.applianceId && response.detail.scanId) {
              $scope.scanner.saveRawData(response.detail).success(function (response) {

                $state.go('main');
              }).error(function (response) {
                $window.alert('스캔 raw 데이터 저장 중 에러가 발생했습니다!');
                $log.error('Save scan raw data: ', response);
              });
            } else {
              $state.go('main');
            }

          } else {
            $window.alert('스캔 저장 중 에러가 발생했습니다!');
            $log.error('Save scan history: ', response);
          }

        }).catch(function (response) {
          $window.alert('스캔 저장 중 에러가 발생했습니다!');
          $log.error('Save scan history: ', response);
        });

      };

      $scope.toProperUnit = function (usage) {

        var properUnit = '';

        if (usage < 1000) {
          properUnit += usage + ' mW';
        } else if (usage < 1000000) {
          properUnit += (usage / 1000).toFixed(2) + ' W';
        } else {
          properUnit += (usage / 1000000).toFixed(2) + ' KW';
        }

        return properUnit;
      };
    };

  });
