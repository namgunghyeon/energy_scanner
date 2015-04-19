'use strict';

angular.module('energyScannerApp')
  .factory('User', function (API, $http) {

    function Info() {
      this.email = '';
      this.name = '';
      this.site_hash = '';
      this.site_id = '';
      this.device_hash = '';
      this.encodedApiKey = 'YTU1ZGVjMDJkMTM2NDRmYmJjNTc0MmE2MTg1Nzc4YzQ=';
    }

    var _userInfo = new Info();

    return {

      getInfo: function () {
        return _userInfo;
      },

      setInfo: function (info) {

        for (var p in info) {
          if (_userInfo.hasOwnProperty(p)) {
            _userInfo[p] = info[p];
          }
        }

      },

      signIn: function (credential) {

        credential.app_version = 'web';

        return $http({
          method: 'POST',
          url: API.SIGNIN,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + _userInfo.encodedApiKey
          },
          data: credential
        });

      },

      isLoggedIn: function () {
        return !!_userInfo.email;
      }

    };
  });
