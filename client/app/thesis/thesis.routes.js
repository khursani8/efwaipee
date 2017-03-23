'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('thesis', {
      url: '/thesis',
      template: '<thesis></thesis>'
    });
}
