'use strict';

angular.module('energyScannerApp')
  .controller('ApplianceCtrl', function ($scope, Appliance) {

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

    $scope.init = function () {

      // GET Appliance API
      $scope.appliances = [
        {
          id: 0,
          name: '냉장고',
          icon: '/assets/images/icon_refrigerator.png',
          modelName: '',
          mode: ''
        },
        {
          id: 1,
          name: '김치 냉장고',
          icon: '/assets/images/icon_kimchirefrigerator.png',
          modelName: '',
          mode: ''
        },
        {
          id: 2,
          name: '세탁기',
          icon: '/assets/images/icon_washer.png',
          modelName: '',
          mode: ''
        },
        {
          id: 3,
          name: '전기밥솥',
          icon: '/assets/images/icon_ricepot.png',
          modelName: '',
          mode: ''
        },
        {
          id: 4,
          name: 'Others',
          icon: '/assets/images/icon_etc.png',
          modelName: '',
          mode: ''
        }
      ];

      $scope.selected = {};
    };

  });
