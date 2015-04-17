'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myApplianceDetail', {
        url: '/myApplianceDetail/:applianceId',
        templateUrl: 'app/routes/my_appliance_detail/my_appliance_detail.html',
        controller: 'MyApplianceDetailCtrl',
        resolve: {
          applianceId: ['$stateParams', function ($stateParams) {
            return $stateParams.applianceId;
          }]
        }
      });
  });
