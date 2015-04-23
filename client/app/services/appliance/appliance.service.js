'use strict';

angular.module('energyScannerApp')
  .factory('Appliance', function (API, User, $http) {

    var userInfo = User.getInfo();

    return {

      setDefaultApplianceTypes: function () {

        return $http({
          method: 'POST',
          url: API.SET_DEFAULT_APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      getApplianceTypes: function () {

        return $http({
          method: 'GET',
          url: API.USER_APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      addApplianceType: function (appliance) {

        appliance = appliance || {};

        return $http({
          method: 'POST',
          url: API.USER_APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            appCode: appliance.code || 'A5',
            desc: appliance.name
          }
        });
      }
    };
  });
