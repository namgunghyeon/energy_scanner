'use strict';

angular.module('energyScannerApp')
  .controller('ScanHistoryCtrl', function ($scope) {

    $scope.back = {
      stateName: 'main',
      label: 'Home'
    };

    $scope.myAppliances = [
      {
        id: 0
      },
      {
        id: 1
      },
      {
        id: 2
      }
    ];

  });
