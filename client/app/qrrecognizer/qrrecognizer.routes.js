'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('qrrecognizer', {
      url: '/qrrecognizer',
      template: '<qrrecognizer></qrrecognizer>'
    });
}
