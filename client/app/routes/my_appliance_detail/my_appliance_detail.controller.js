'use strict';

angular.module('energyScannerApp')
  .controller('MyApplianceDetailCtrl', function ($scope, scanId, ScanHistory, User, Scanner, $state, $q, $log) {

    if (!User.isLoggedIn()) {
      $state.go('intro');
      return;
    }

    $scope.back = {
      stateName: 'scanHistory',
      label: 'My Appliances'
    };

    $scope.init = function () {

      $q.all([
        ScanHistory.getScanHistoryOne(scanId),
        ScanHistory.getScanRawData(scanId)
      ]).then(function (responses) {

        var historyResponse = responses[0].data[0] || {},
          rawDataResponse = responses[1].data;

        $scope.record = {
          scanId: historyResponse.scan_id,
          name: historyResponse.name,
          model: historyResponse.model,
          mode: historyResponse.mode1 || historyResponse.mode2,
          scannedAt: {
            start: historyResponse.start,
            end: historyResponse.end
          },
          totalUsage: historyResponse.totalUsage
        };

        if (rawDataResponse.code === 200) {
          $scope.rawData = rawDataResponse.detail.data;
        }

      }).catch(function (response) {
        $log.error('My appliance detail init: ', response);
      });

    };

    $scope.goToScanView = function () {

      if (Scanner.isScanning) {
        $state.go('scanSetting', {
          appliance: angular.toJson(Scanner.appliance)
        }, {
          location: false
        });
      } else {
        $state.go('scanEnergy');
      }

    };

  });
