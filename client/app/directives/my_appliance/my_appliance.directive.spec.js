'use strict';

describe('Directive: myAppliance', function () {

  // load the directive's module and view
  beforeEach(module('energyScannerApp'));
  beforeEach(module('app/directives/my_appliance/my_appliance.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-appliance></my-appliance>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myAppliance directive');
  }));
});