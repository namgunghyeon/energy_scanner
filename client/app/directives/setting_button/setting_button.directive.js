'use strict';

angular.module('energyScannerApp')
  .directive('settingButton', function ($document, $timeout, $log) {
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
      }
    };
  });
