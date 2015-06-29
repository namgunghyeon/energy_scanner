'use strict';

angular.module('energyScannerApp')
  .controller('ScanHistoryCtrl', function ($scope, ScanHistory, $log) {

    $scope.back = {
      stateName: 'main',
      label: 'Home'
    };

    $scope.init = function () {

      ScanHistory.getScanHistory().success(function (response) {
        $scope.scanList = response;
      }).error(function (response) {
        $log.error('Get appliances: ', response);
      });

    };

  });
