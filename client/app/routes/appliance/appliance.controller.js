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
      Appliance.getApplianceTypes().success(function (response) {

        if (response.length === 0) {

          Appliance.setDefaultApplianceTypes().success(function (response) {

            if (response === 200 || response === '200') {
              Appliance.getApplianceTypes().success(function (response) {
                $scope.appliances = response;
              }).error(function (response) {
                $log.error('Get appliance types after set default types: ', response);
              });
            }

          }).error(function (response) {
            $log.error('Set default appliance types: ', response);
          });

        } else {
          $scope.appliances = response;
        }

        $scope.selected = {};

      }).error(function (response) {
        $log.error('Get appliance types: ', response);
      });

    };

    $scope.goToScanSetting = function () {

      if ($scope.selected.code === 'A5' && !$scope.selected.desc) {
        Appliance.addApplianceType($scope.selected).success(function (response) {
          debugger;

          $state.go('scanSetting', {
            appliance: angular.toJson($scope.selected)
          }, {
            location: false
          });

        }).error(function (response) {
          $log.error('Add appliance type: ', response);
        });

      } else {

        $state.go('scanSetting', {
          appliance: angular.toJson($scope.selected)
        }, {
          location: false
        });

      }

    };

  });
