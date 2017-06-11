'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';

export class DashboardComponent {
  /*@ngInject*/
  constructor($http) {
    this.http = $http;
  }

  checkLog(){

    this.http.get('/api/logs/studentId/'+this.id)
      .then(res=>{
        this.logs = res.data;
        console.log('dpt logs',this.logs)
      })

  }
}

export default angular.module('efwaipeeApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .filter('translate', function() {
  return function(input) {
    input = input || '';
    var out = '';
    switch (input) {
      case 1:
        return 'CGS RECEIVED';
      case 2:
        return 'CGS SENT';
      case 3:
        return 'EXAMINER RECEIVED';
      case 4:
        return 'EXAMINER SENT';
      default:
        break;
    }
    return out;
  };
})
  .name;
