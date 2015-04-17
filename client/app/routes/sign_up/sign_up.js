'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('signUp', {
        url: '/signUp',
        templateUrl: 'app/routes/sign_up/sign_up.html',
        controller: 'SignUpCtrl'
      });
  });
