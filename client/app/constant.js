'use strict';

angular.module('energyScannerApp')
  .constant('API', (function () {

    var DOMAIN = 'http://api.ongetit.com';

    return {
      'SIGNIN'     : DOMAIN + '/1.1/users/basicinfo/signin',
      'SIGNUP'     : DOMAIN + '/1.1/users/basicinfo/signup',
      'USER_DEVICES'    : function (email) {
        return '/api/users/' + email + '/device'
      },
      'USER_APPLIANCES' : function (email) {
        return '/api/users/' + email + '/appliance'
      },
      'APPLIANCE_CODE': '/api/appliances/'
    };

  })());
