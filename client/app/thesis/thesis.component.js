'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './thesis.routes';

export class ThesisComponent {

    awesomeThesis = [];
    /*@ngInject*/
    constructor($http, $scope, socket) {
        this.$http = $http;
        this.socket = socket;
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thesis');
        });
    }

    $onInit() {
        this.$http.get('/api/thesis')
            .then(response => {
                this.awesomeThesis = response.data;
                console.log(response.data)
                this.socket.syncUpdates('thesis', this.awesomeThesis);
            });

    }

    addThesis() {
        if (this.thesisName) {
            this.$http.post('/api/thesis', {
                name: this.thesisName,
                studentId: this.studentId,
                examinerId: this.examinerId,
                checkpoint: this.checkpoint,
                status: this.status
            });
            this.thesisName = '';
            this.examinerId = '';
            this.studentId = '';
        }
    }

    deleteThesis(thesis) {
        console.log('ctheis', thesis)
        this.$http.delete(`/api/thesis/${thesis._id}`);
    }


}

export default angular.module('efwaipeeApp.thesis', [uiRouter])
    .config(routes)
    .component('thesis', {
        template: require('./thesis.html'),
        controller: ThesisComponent,
        controllerAs: 'thesisCtrl'
    })
    .name;