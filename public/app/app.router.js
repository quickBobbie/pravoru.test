angular.module('app').config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './build/contactlist/contactList.template.html',
                controller: 'contactListController'
            })
            .when('/contact/add', {
                templateUrl: './build/contactMutation/contactMutation.template.html',
                controller: 'contactMutationController'
            })
            .when('/contact/:id', {
                templateUrl: './build/contactInfo/contactInfo.template.html',
                controller: 'contactInfoController'
            })
            .when('/contact/:id/update', {
                templateUrl: './build/contactMutation/contactMutation.template.html',
                controller: 'contactMutationController'
            })
            .otherwise('/');
    }
]);