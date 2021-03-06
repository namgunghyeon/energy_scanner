'use strict';

angular.module('energyScannerApp')
  .factory('Appliance', function (API, User, $http) {

    return {

      setDefaultApplianceTypes: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'POST',
          url: API.DEFAULT_APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      getApplianceTypes: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      addApplianceType: function (applianceType) {

        var userInfo = User.getInfo();

        applianceType = applianceType || {};

        return $http({
          method: 'POST',
          url: API.APPLIANCE_TYPES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            appCode: applianceType.code || 'A5',
            desc: applianceType.name
          }
        });
      },

      getAppliances: function () {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.APPLIANCES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          }
        });

      },

      addAppliance: function (appliance) {

        var userInfo = User.getInfo();

        appliance = appliance || {};

        return $http({
          method: 'POST',
          url: API.APPLIANCES(userInfo.email),
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            id: appliance.id,
            model: appliance.modelName,
            mode1: appliance.mode1,
            desc: appliance.desc,
            userDeviceId: appliance.userDeviceId
          }
        });
      }
    };
  });
