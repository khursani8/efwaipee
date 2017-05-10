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

export class ThesisDetailsComponent{
    constructor($http, $scope, socket,$stateParams) {
        this.$http = $http;
        this.socket = socket;
        
        $scope.id = $stateParams.id;
        console.log('testscope',$scope.id);

        $scope.generateQR = function (params) {
        $('#qrcode').empty()
            // console.log('generateQR',params);
        $('#qrcode').qrcode(params);
    }
    
        $scope.generateQR({text:$scope.id
        ,foreground:"#2196F3",background:"#FCC11B"
        });

    }
}

export default angular.module('efwaipeeApp.thesis', [uiRouter])
.filter('status', function() {
        return function(input) {
            var output;
            switch (input) {
                case "1":
                    output = "Sending"
                    break;
                case "2":
                    output = "Arrived"
                    break;
                default:
                    output = "Completed"
            }
            return output;
        }
    })
    .filter('checkpoint', function() {
        return function(input) {
            var output;
            switch (input) {
                case "1":
                    output = "CIS"
                    break;
                case "2":
                    output = "CGS"
                    break;
                default:
                    output = "UAC"
            }
            return output;
        }
    })
    .config(routes)
    .component('thesis', {
        template: require('./thesis.html'),
        controller: ThesisComponent,
        controllerAs: 'thesisCtrl'
    })
    .component('details',{
        template: require('./thesis.details.html'),
        controller: ThesisDetailsComponent,
        controllerAs: 'thesisDetailsCtrl'
    })
    .name;