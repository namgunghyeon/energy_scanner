'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('device', {
        templateUrl: 'app/routes/device/device.html',
        controller: 'DeviceCtrl'
      });
  });
