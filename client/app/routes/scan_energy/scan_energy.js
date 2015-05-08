'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanEnergy', {
        templateUrl: 'app/routes/scan_energy/scan_energy.html',
        controller: 'ScanEnergyCtrl'
      });
  });
