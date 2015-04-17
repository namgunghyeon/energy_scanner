'use strict';

describe('Controller: ScanEnergyCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var ScanEnergyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScanEnergyCtrl = $controller('ScanEnergyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
