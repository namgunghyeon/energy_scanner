'use strict';

angular.module('energyScannerApp')
  .controller('ScanResultCtrl', function ($scope, appliance, Scanner, $state, $window, $log) {

    $scope.back = {
      stateName: 'appliance',
      label: 'Appliance List'
    };

    $scope.init = function () {
      $scope.appliance = appliance;
      $scope.scanner = Scanner;

      //Scanner.saveRawData(appliance).then(function (response) {
      //
      //}).catch(function (response) {
      //
      //});

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

        $scope.scanner.saveHistory(appliance).then(function (response) {

          if (response.code === 200) {
            $window.alert('스캔 데이터가 저장되었습니다.');
            $state.go('main');
          } else {
            $window.alert('스캔 저장 중 에러가 발생했습니다!');
            $log.error('Save scan history: ', response);
          }

        }).catch(function (response) {
          $window.alert('스캔 저장 중 에러가 발생했습니다!');
          $log.error('Save scan history: ', response);
        });

      };
    };

  });
