'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('scanSetting', {
        url: '/scanSetting/:appliance',
        templateUrl: 'app/routes/scan_setting/scan_setting.html',
        controller: 'ScanSettingCtrl',
        resolve: {
          appliance: ['$stateParams', function ($stateParams) {
            return angular.fromJson($stateParams.appliance);
          }]
        }
      });
  });
