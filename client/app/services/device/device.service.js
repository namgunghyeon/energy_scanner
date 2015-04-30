'use strict';

angular.module('energyScannerApp')
  .factory('Device', function (API, User, $q, $http) {

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

      },

      findHash: function (serial) {

        var userInfo = User.getInfo();

        return $http({
          method: 'GET',
          url: API.FIND_DEVICE_HASH,
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            serial: serial
          }
        });

      },

      registerNewDevice: function (serial) {

        return $http({
          method: 'POST',
          url: API.NEW_DEVICE_HASH,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            serial: serial
          }
        });

      },

      getHash: function (serial) {

        var deferred = $q.defer();

        this.registerNewDevice(serial).success(function (response) {

          if (response.code === '200' || response.code === 200) {
            deferred.resolve({
              hash: response.device_hash
            });
          } else {
            deferred.reject(response);
          }

        }).error(function (response) {
          deferred.reject(response);
        });

        //self.findHash(serial).success(function (response) {
        //
        //  if (response.length) {
        //    deferred.resolve(response[0]);
        //  } else {
        //
        //    self.registerNewDevice(serial).success(function (response) {
        //
        //      if (response.code === '200') {
        //        deferred.resolve({
        //          hash: response.device_hash
        //        });
        //      } else {
        //        deferred.reject(response);
        //      }
        //
        //    }).error(function (response) {
        //      deferred.reject(response);
        //    });
        //
        //  }
        //
        //}).error(function (response) {
        //  deferred.reject(response);
        //});

        return deferred.promise;

      }

    };
  });
