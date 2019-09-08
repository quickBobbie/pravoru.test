angular.module('app').config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './build/pages/contactlist/contactList.template.html',
                controller: 'contactListController'
            })
            .when('/contact/add', {
                templateUrl: './build/pages/contactMutation/contactMutation.template.html',
                controller: 'contactMutationController'
            })
            .when('/contact/:id', {
                templateUrl: './build/pages/contactInfo/contactInfo.template.html',
                controller: 'contactInfoController'
            })
            .when('/contact/:id/update', {
                templateUrl: './build/pages/contactMutation/contactMutation.template.html',
                controller: 'contactMutationController'
            })
            .otherwise('/');
    }
]);