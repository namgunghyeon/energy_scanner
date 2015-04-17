'use strict';

describe('Service: appliance', function () {

  // load the service's module
  beforeEach(module('energyScannerApp'));

  // instantiate service
  var appliance;
  beforeEach(inject(function (_appliance_) {
    appliance = _appliance_;
  }));

  it('should do something', function () {
    expect(!!appliance).toBe(true);
  });

});
