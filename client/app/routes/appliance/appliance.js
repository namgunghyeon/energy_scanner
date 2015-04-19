'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('appliance', {
        templateUrl: 'app/routes/appliance/appliance.html',
        controller: 'ApplianceCtrl'
      });
  });
