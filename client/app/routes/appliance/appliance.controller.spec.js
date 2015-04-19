'use strict';

describe('Controller: ApplianceCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var ApplianceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApplianceCtrl = $controller('ApplianceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
