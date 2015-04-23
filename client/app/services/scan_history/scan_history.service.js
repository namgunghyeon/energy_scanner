'use strict';

angular.module('energyScannerApp')
  .factory('ScanHistory', function (API, User, $http) {

    var userInfo = User.getInfo();

    return {

      saveScanHistory: function (scanHistory) {

        return $http({
          method: 'POST',
          url: API.USER_SCAN_HISTORY(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: scanHistory
        });
      }
    };

  });
