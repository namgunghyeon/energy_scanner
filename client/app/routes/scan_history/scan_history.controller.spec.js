'use strict';

describe('Controller: ScanHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var ScanHistoryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScanHistoryCtrl = $controller('ScanHistoryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
