'use strict';

describe('Controller: ScanResultCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var ScanResultCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScanResultCtrl = $controller('ScanResultCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
