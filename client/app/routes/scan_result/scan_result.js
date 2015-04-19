'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanResult', {
        templateUrl: 'app/routes/scan_result/scan_result.html',
        controller: 'ScanResultCtrl'
      });
  });
