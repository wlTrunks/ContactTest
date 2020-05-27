import {IScope} from "angular";
import {IHttpService, IPromise} from 'angular';
import {Contact} from "../model/Contact";
import {strict} from "assert";

interface ContactsScope extends ng.IScope {
    contactlist: Contact[]
}


export class WebController implements ng.IComponentController {
    static $inject = ['$scope', '$http']

    private path: string = '/api/contacts/'

    constructor(private $scope: ContactsScope, private $http: ng.IHttpService) {
        this.refresh();
    }

    public $onInit() {
        console.log("I got the data I requested");
        this.$scope.contactlist = [
            new Contact
        ];
        this.refresh();
    }


    public refresh() {
        this.$http.get(`${this.path}all`).then(function (success) {
            console.log("refresh")
        })
    }
}

