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
        this.$scope = $scope;
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thesis');
        });

        $scope.generateQR =  (params) => {
            if(params){
            this.$http.get('/api/thesis/'+params)
            .then(response => {
                this.awesomeThesis = response.data;
                console.log(response.data)
                this.socket.syncUpdates('thesisGroup', this.awesomeThesisGroup);
            });
            console.log(params);
            $('#modal1').modal('open');
            $('#qrcode').empty()
            $('#qrcode').qrcode(params);
            }
        }
    }

    $onInit() {
        
        this.$http.get('/api/thesis/group')
            .then(response => {
                this.awesomeThesisGroup = response.data;
                this.backup = response.data;
                this.socket.syncUpdates('thesisGroup', this.awesomeThesisGroup);
            });
    }

    time(received){
        this.$scope.readable = this.moment(received) || "Examiner not received"
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
                this.awesomeThesisGroup = response.data;
            })
            .catch(()=>{
                this.awesomeThesisGroup = this.backup;
            })
        }
        $('.tooltipped').tooltip({delay: 50});
        $('select').material_select();
        $('.modal').modal();
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
        if (this.thesisName && this.studentId && this.examinerId && this.examinerName && this.examinerPhone) {
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

    deleteThesis(thesisid) {
        console.log('ctheisid', thesisid)
        this.$http.delete(`/api/thesis/${thesisid}`);
    }


}

// export class ThesisDetailsComponent{
//     constructor($http, $scope, socket,$stateParams) {
//         this.$http = $http;
//         this.socket = socket;
        
//         $scope.id = $stateParams.id;

//         $scope.generateQR = function (params) {
//         $('#qrcode').empty()
//             // console.log('generateQR',params);
//         $('#qrcode').qrcode(params);
//     }
    
//         $scope.generateQR({text:$scope.id
//         // ,foreground:"#2196F3",background:"#FCC11B"
//         });

//     }
// }

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
    // .component('details',{
    //     template: require('./thesis.details.html'),
    //     controller: ThesisDetailsComponent,
    //     controllerAs: 'thesisDetailsCtrl'
    // })
    .name;