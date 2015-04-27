'use strict';

angular.module('energyScannerApp')
  .directive('signIn', function (User, $state, $cookies, $window, $log) {
    return {
      templateUrl: 'app/directives/sign_in/sign_in.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

        function isValidCredential (credential) {

          var result = {
            isValid: true,
            message: ''
          };

          if (!credential.email) {
            result.isValid = false;
            result.message = '이메일을 입력해주세요.';
          } else if (!credential.password) {
            result.isValid = false;
            result.message = '패스워드를 입력해주세요.';
          }

          return result;

        }

        try {
          var credentialCookie = angular.fromJson($window.atob($cookies.esu));
        } catch (e) {
          credentialCookie = {};
        }

        scope.credential = {
          email: credentialCookie.email || '',
          password: credentialCookie.password || '',
          keepLogin: (credentialCookie.keepLogin && parseInt(credentialCookie.keepLogin, 10)) || 0
        };

        scope.signIn = function (credential) {

          var validation = isValidCredential(credential);

          if (validation.isValid) {

            User.signIn(credential).success(function (response) {

              User.setInfo(response);

              if (response.code === 200 || response.code === 204) {

                $cookies.esu = $window.btoa(angular.toJson(credential));

                $state.go('main');
              } else {
                $window.alert(response.message);
              }

            }).error(function (response) {
              throw Error(response.message);
            });

          } else {
            scope.formMessage = validation.message;
          }

        };

      }
    };
  });
