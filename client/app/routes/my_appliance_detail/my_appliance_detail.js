'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myApplianceDetail', {
        url: '/myApplianceDetail/:scanId',
        templateUrl: 'app/routes/my_appliance_detail/my_appliance_detail.html',
        controller: 'MyApplianceDetailCtrl',
        resolve: {
          scanId: ['$stateParams', function ($stateParams) {
            return $stateParams.scanId;
          }]
        }
      });
  });
