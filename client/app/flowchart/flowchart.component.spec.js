'use strict';

describe('Component: FlowchartComponent', function() {
  // load the controller's module
  beforeEach(module('efwaipeeApp.flowchart'));

  var FlowchartComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    FlowchartComponent = $componentController('flowchart', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
