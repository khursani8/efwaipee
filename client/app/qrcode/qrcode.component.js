'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './qrcode.routes';

export class QrcodeComponent {
  /*@ngInject*/
  constructor($http, $scope, socket) {
    
    $scope.thesisId = "any id"
    $scope.generateQR = function (params) {
        $('#qrcode').empty()
        // console.log('generateQR',params);
      $('#qrcode').qrcode(params);
    }
    $scope.generateQR({text:'tak kesah size data',foreground:"#2196F3",background:"#FCC11B"});
    
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
