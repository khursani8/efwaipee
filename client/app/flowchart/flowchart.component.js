'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './flowchart.routes';

export class FlowchartComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('efwaipeeApp.flowchart', [uiRouter])
  .config(routes)
  .component('flowchart', {
    template: require('./flowchart.html'),
    controller: FlowchartComponent,
    controllerAs: 'flowchartCtrl'
  })
  .name;
