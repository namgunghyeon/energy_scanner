'use strict';

angular.module('energyScannerApp')
  .factory('ScanHistory', function (API, User, $http) {

    return {

      getScanHistory: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.SCAN_HISTORY(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      getScanHistoryOne: function (scanId) {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.SCAN_HISTORY(userInfo.email) + '/' + scanId,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

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

      getScanRawData: function (scanId) {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.SCAN_RAW_DATA(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            scanId: scanId
          }
        });

      },

      saveScanRawData: function (ids, rawData) {

        var userInfo = User.getInfo();

        return $http({
          method: 'POST',
          url: API.SCAN_RAW_DATA(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            applianceId: ids.applianceId,
            scanId: ids.scanId,
            rawData: rawData
          }
        });
      }
    };

  });
