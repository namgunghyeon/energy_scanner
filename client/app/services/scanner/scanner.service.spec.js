'use strict';

describe('Service: scanner', function () {

  // load the service's module
  beforeEach(module('energyScannerApp'));

  // instantiate service
  var scanner;
  beforeEach(inject(function (_scanner_) {
    scanner = _scanner_;
  }));

  it('should do something', function () {
    expect(!!scanner).toBe(true);
  });

});
