'use strict';

angular.module('energyScannerApp')
  .factory('Appliance', function (API, User, $log) {

    var userInfo = User.getInfo();

    return {
      getAppliances: function () {

        return $http({
          method: 'GET',
          url: API.APPLIANCES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      setDevice: function (appliance) {

        appliance = appliance || {};

        return $http({
          method: 'POST',
          url: API.APPLIANCES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            serial: appliance.serial,
            hash: appliance.hash
          }
        });
      }
    };
  });
