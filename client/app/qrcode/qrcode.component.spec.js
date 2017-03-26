'use strict';

describe('Component: QrcodeComponent', function() {
  // load the controller's module
  beforeEach(module('efwaipeeApp.qrcode'));

  var QrcodeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    QrcodeComponent = $componentController('qrcode', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
