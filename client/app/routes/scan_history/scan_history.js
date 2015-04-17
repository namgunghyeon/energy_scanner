'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanHistory', {
        templateUrl: 'app/routes/scan_history/scan_history.html',
        controller: 'ScanHistoryCtrl'
      });
  });
