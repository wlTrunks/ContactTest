import * as express from 'express';
import {IHttpService, IPromise} from 'angular';
// import {WebController} from "./web.controller";
// import * as angular from "angular";
// var app = angular.module('app', []).service('$exceptionHandler', function () {
//     return function (error, cause) {
//         console.log('ERROR caught by exception handler: ', error, cause)
//     }
// });
export function setupWeb(app: express.Application) {
    app.get('/', function (req, res) {
        res.sendFile(__dirname + "/index.html");
    });
}

