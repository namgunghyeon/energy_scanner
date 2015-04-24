'use strict';

angular.module('energyScannerApp')
  .factory('User', function (API, $http) {

    function Info() {
      this.email = '';
      this.name = '';
      this.site_hash = '';
      this.site_id = '';
      this.device_hash = '';
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

        return $http({
          method: 'POST',
          url: API.SIGNIN,
          data: credential
        });

      },

      isLoggedIn: function () {
        return !!_userInfo.email;
      }

    };
  });
