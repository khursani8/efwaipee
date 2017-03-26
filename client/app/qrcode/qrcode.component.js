'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './qrcode.routes';

export class QrcodeComponent {
  /*@ngInject*/
  constructor($http, $scope, socket) {
    

  }
}

export default angular.module('efwaipeeApp.qrcode', [uiRouter])
  .config(routes)
  .component('qrcode', {
    template: require('./qrcode.html'),
    controller: QrcodeComponent,
    controllerAs: 'qrcodeCtrl'
  })
  .name;
