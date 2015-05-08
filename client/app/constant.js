'use strict';

angular.module('energyScannerApp')
  .constant('API', (function () {

    return {
      'SIGNIN'     : '/api/users/signin',
      'SIGNUP'     : '/api/users/signup',
      'DEVICES'    : function (email) {
        return '/api/devices/' + email;
      },
      'DEVICE_REALTIME': '/api/devices/realtime',
      'FIND_DEVICE_HASH': '/api/devices/findHash',
      'NEW_DEVICE_HASH': '/api/devices/newHash',
      'APPLIANCE_TYPES' : function (email) {
        return '/api/appliances/' + email + '/applianceType';
      },
      'DEFAULT_APPLIANCE_TYPES': function (email) {
        return '/api/appliances/' + email + '/defaultUserAppliance';
      },
      'APPLIANCES': function (email) {
        return '/api/appliances/' + email;
      },
      'SCAN_HISTORY': function (email) {
        return '/api/scan/' + email + '/history';
      },
      'SCAN_RAW_DATA': function (email) {
        return '/api/scan/' + email + '/rawData';
      }
    };

  })());
