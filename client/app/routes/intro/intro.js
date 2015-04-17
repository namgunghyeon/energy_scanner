'use strict';

angular.module('energyScannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('intro', {
        url: '/',
        templateUrl: 'app/routes/intro/intro.html',
        controller: 'IntroCtrl'
      });
  });
