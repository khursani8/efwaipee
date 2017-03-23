'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';
import ThesisComponent from './thesis/thesis.component';


import {
    routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.scss';

angular.module('efwaipeeApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
        uiBootstrap, _Auth, account, admin, navbar, footer, main, constants, socket, util,
        ThesisComponent
    ])
    .config(routeConfig)
    .run(function($rootScope, $location, Auth) {
        'ngInject';
        // Redirect to login if route requires auth and you're not logged in

        $rootScope.$on('$stateChangeStart', function(event, next) {
            Auth.isLoggedIn(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    })
    .filter('status', function() {

        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
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

        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
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

    });

angular.element(document)
    .ready(() => {
        angular.bootstrap(document, ['efwaipeeApp'], {
            strictDi: true
        });
    });