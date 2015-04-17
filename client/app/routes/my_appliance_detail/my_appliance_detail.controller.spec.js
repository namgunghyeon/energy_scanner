'use strict';

describe('Controller: MyApplianceDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('energyScannerApp'));

  var MyApplianceDetailCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyApplianceDetailCtrl = $controller('MyApplianceDetailCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
