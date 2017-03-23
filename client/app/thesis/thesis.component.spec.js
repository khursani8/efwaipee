'use strict';

describe('Component: ThesisComponent', function() {
  // load the controller's module
  beforeEach(module('efwaipeeApp.thesis'));

  var ThesisComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ThesisComponent = $componentController('thesis', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
