'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('qrcode', {
      url: '/qrcode',
      template: '<qrcode></qrcode>'
    });
}
