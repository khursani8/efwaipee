'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('flowchart', {
      url: '/flowchart',
      template: '<flowchart></flowchart>'
    });
}
