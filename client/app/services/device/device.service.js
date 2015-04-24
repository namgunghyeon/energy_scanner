'use strict';

angular.module('energyScannerApp')
  .factory('Device', function (API, User, $http) {

    return {

      getDevices: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.DEVICES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      setDevice: function (device) {

        var userInfo = User.getInfo();

        device = device || {};

        return $http({
          method: 'POST',
          url: API.DEVICES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: device
        });
      },

      getRealtimeUsage: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.DEVICE_REALTIME,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            deviceHash: userInfo.device_hash
          }
        });

      }

    };
  });
