'use strict';

describe('Directive: signIn', function () {

  // load the directive's module and view
  beforeEach(module('energyScannerApp'));
  beforeEach(module('app/directives/sign_in/sign_in.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sign-in></sign-in>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signIn directive');
  }));
});