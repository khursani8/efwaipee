'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './qrrecognizer.routes';

export class QrrecognizerComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('efwaipeeApp.qrrecognizer', [uiRouter])
  .config(routes)
  .component('qrrecognizer', {
    template: require('./qrrecognizer.html'),
    controller: QrrecognizerComponent,
    controllerAs: 'qrrecognizerCtrl'
  })
  .name;
