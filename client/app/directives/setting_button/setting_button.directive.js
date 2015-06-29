'use strict';

angular.module('energyScannerApp')
  .directive('settingButton', function ($document, $timeout, $state, Scanner, $window, $log) {
    return {
      templateUrl: 'app/directives/setting_button/setting_button.html',
      restrict: 'EA',
      scope: {

      },
      link: function (scope) {

        scope.settings = [
          {
            label: 'Sign out',
            stateName: 'intro'
          }
        ];

        scope.popup = function () {

          scope.showPopup = !scope.showPopup;

          if (scope.showPopup) {

            $timeout(function () {
              $document.one('click', function (e) {
                scope.$apply(function () {
                  scope.showPopup = false;
                });
              });
            }, 0);
          }
        };

        scope.signOut = function () {
          var msg = '지금 로그아웃 할 경우 진행중인 스캔이 저장되지 않고 종료됩니다!\n로그아웃 하시겠습니까?';
          if (Scanner.isScanning) {
            if ($window.confirm(msg)) {
              $state.go('intro');
            }
          } else {
            $state.go('intro');
          }
        }
      }
    };
  });
