'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainCtrl'
      });
  });
