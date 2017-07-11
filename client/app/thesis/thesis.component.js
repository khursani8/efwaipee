'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './thesis.routes';

export class ThesisComponent {

    
    /*@ngInject*/
    constructor($http, $scope, socket,moment) {
        this.$http = $http;
        this.socket = socket;
        this.moment = moment;
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thesis');
        });
    }

    $onInit() {
        this.$http.get('/api/thesis')
            .then(response => {
                this.awesomeThesis = response.data;
                this.backup = response.data;
                console.log(response.data)
                this.socket.syncUpdates('thesis', this.awesomeThesis);
            });

    }

    readabletime(received){
        if(received)
            return this.moment(received)
        return "Examiner not received"
    }

    time(received){
        var output;
        received = Math.floor(this.moment(new Date()).diff(this.moment(received),'months',true))
        switch (received) {
            case 1:
                output = "one"
                break;
            case 2:
                output = "two"
                break;
            case 3:
                output = "three"
                break;
            default:
                output = null;
                break;
        }
        return output;
        
    }

    search(){
        // console.log(this.keyword);
        if(this.keyword){
            this.$http.get('/api/thesis/name/'+this.keyword)
            .then(response=>{
                this.awesomeThesis = response.data;
            })
            .catch(()=>{
                this.awesomeThesis = this.backup;
            })
        }
    }

    fillForm(thesis){
        this.thesisName = thesis.name
        this.studentId = thesis.studentId
        this.studentName = thesis.studentName
        this.examinerId = thesis.examinerId
        this.examinerName = thesis.examinerName
        this.examinerPhone = thesis.examinerPhone
    }

    addThesis() {
        if (this.thesisName) {
            this.$http.post('/api/thesis', {
                name: this.thesisName,
                studentId: this.studentId,
                studentName: this.studentName,
                examinerId: this.examinerId,
                examinerName: this.examinerName,
                examinerPhone: this.examinerPhone
            });
            // this.thesisName = '';
            this.examinerId = '';
            this.examinerName = '';
            this.examinerPhone = '';
            // this.studentId = '';
            // this.studentName = '';
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

        $scope.generateQR = function (params) {
        $('#qrcode').empty()
            // console.log('generateQR',params);
        $('#qrcode').qrcode(params);
    }
    
        $scope.generateQR({text:$scope.id
        // ,foreground:"#2196F3",background:"#FCC11B"
        });

    }
}

export default angular.module('efwaipeeApp.thesis', [uiRouter])
    .filter('checkpoint', function() {
        return function(input) {
            var output;
            switch (input) {
                case 1:
                    output = "CGS RECEIVED"
                    break;
                case 2:
                    output = "CGS SEND"
                    break;
                case 3:
                    output = "EXAMINER RECEIVED"
                    break;
                case 4:
                    output = "EXAMINER SEND"
                    break;
                default:
                    output = "STUDENT"
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