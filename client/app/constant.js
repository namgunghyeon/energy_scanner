'use strict';

angular.module('energyScannerApp')
  .constant('API', (function () {

    var DOMAIN = 'http://api.ongetit.com';

    return {
      'SIGNIN'     : DOMAIN + '/1.1/users/basicinfo/signin',
      'SIGNUP'     : DOMAIN + '/1.1/users/basicinfo/signup'
    };

  })());
