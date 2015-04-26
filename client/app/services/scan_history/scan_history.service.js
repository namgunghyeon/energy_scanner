'use strict';

angular.module('energyScannerApp')
  .factory('ScanHistory', function (API, User, $http) {

    return {

      saveScanHistory: function (scanHistory) {

        var userInfo = User.getInfo();

        return $http({
          method: 'POST',
          url: API.SCAN_HISTORY(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: scanHistory
        });
      },

      saveScanRawData: function (applianceId, rawData) {

        var userInfo = User.getInfo();

        return $http({
          method: 'POST',
          url: API.SCAN_RAW_DATA(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            applianceId: applianceId,
            rawData: rawData
          }
        });
      }
    };

  });
