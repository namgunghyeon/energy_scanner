'use strict';

describe('Controller: ScanSettingCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var ScanSettingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScanSettingCtrl = $controller('ScanSettingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
