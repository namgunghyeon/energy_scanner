'use strict';

angular.module('energyScannerApp')
  .factory('Device', function (API, User, $http) {

    var userInfo = User.getInfo();

    return {

      getDevices: function () {

        return $http({
          method: 'GET',
          url: API.USER_DEVICES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      },

      setDevice: function (device) {

        device = device || {};

        return $http({
          method: 'POST',
          url: API.USER_DEVICES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: device
        });
      }
    };
  });
