'use strict';

angular.module('energyScannerApp')
  .constant('API', (function () {

    var DOMAIN = 'http://api.ongetit.com';

    return {
      //'SIGNIN'     : DOMAIN + '/1.1/users/basicinfo/signin',
      //'SIGNUP'     : DOMAIN + '/1.1/users/basicinfo/signup',
      'SIGNIN'     : '/api/users/signin',
      'SIGNUP'     : '/api/users/signup',
      'DEVICES'    : function (email) {
        return '/api/devices/' + email;
      },
      'DEVICE_REALTIME': '/api/devices/realtime',
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
      }
    };

  })());
