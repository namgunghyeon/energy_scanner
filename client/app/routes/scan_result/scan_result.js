'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanResult', {
        url: '/scanResult/:appliance',
        templateUrl: 'app/routes/scan_result/scan_result.html',
        controller: 'ScanResultCtrl',
        resolve: {
          appliance: ['$stateParams', function ($stateParams) {
            return angular.fromJson($stateParams.appliance);
          }]
        }
      });
  });
