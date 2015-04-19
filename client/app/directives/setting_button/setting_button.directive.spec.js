'use strict';

describe('Directive: settingButton', function () {

  // load the directive's module and view
  beforeEach(module('energyScannerApp'));
  beforeEach(module('app/directives/setting_button/setting_button.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<setting-button></setting-button>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the settingButton directive');
  }));
});