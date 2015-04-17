'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanEnergy', {
        url: '/scanEnergy/:applianceId',
        templateUrl: 'app/routes/scan_energy/scan_energy.html',
        controller: 'ScanEnergyCtrl',
        resolve: {
          applianceId: ['$stateParams', function ($stateParams) {
            return $stateParams.applianceId;
          }]
        }
      });
  });
