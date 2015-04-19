'use strict';

angular.module('energyScannerApp')
  .factory('Appliance', function (API, User, $http) {

    var userInfo = User.getInfo();

    return {

      getCode: function () {

        return $http({
          method: 'GET',
          url: API.APPLIANCE_CODE,
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      getAppliances: function () {

        return $http({
          method: 'GET',
          url: API.USER_APPLIANCES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      setAppliance: function (appliance) {

        appliance = appliance || {};

        return $http({
          method: 'POST',
          url: API.USER_APPLIANCES(userInfo.email),
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
