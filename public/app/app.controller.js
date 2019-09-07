angular.module('app').controller('appController', [
    '$scope',
    '$rootScope',
    function ($scope, $rootScope) {
        $rootScope.API_URL = 'http://localhost:3000';
    }
]);