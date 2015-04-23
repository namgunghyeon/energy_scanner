'use strict';

describe('Service: scanHistory', function () {

  // load the service's module
  beforeEach(module('energyScannerApp'));

  // instantiate service
  var scanHistory;
  beforeEach(inject(function (_scanHistory_) {
    scanHistory = _scanHistory_;
  }));

  it('should do something', function () {
    expect(!!scanHistory).toBe(true);
  });

});
