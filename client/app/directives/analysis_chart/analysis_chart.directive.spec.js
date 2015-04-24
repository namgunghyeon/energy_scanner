'use strict';

describe('Directive: analysisChart', function () {

  // load the directive's module and view
  beforeEach(module('energyScannerApp'));
  beforeEach(module('app/directives/analysis_chart/analysis_chart.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<analysis-chart></analysis-chart>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the analysisChart directive');
  }));
});