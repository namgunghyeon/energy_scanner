'use strict';

describe('Directive: applianceRecord', function () {

  // load the directive's module and view
  beforeEach(module('energyScannerApp'));
  beforeEach(module('app/directives/appliance_record/appliance_record.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<appliance-record></appliance-record>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the applianceRecord directive');
  }));
});