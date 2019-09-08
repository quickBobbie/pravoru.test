angular.module('app').controller('contactInfoController', [
    '$scope',
    '$rootScope',
    '$http',
    '$routeParams',
    'contactService',
    function($scope, $rootScope, $http, $routeParams, contactService) {
        $scope.contact = {};

        $scope.getContact = () => {
            let contact = angular.copy(contactService.getContact($routeParams.id));

            if (Object.keys(contact).length) {
                return $scope.contact = contact;
            }

            let url = [$rootScope.API_URL, 'contact', $routeParams.id].join('/');

             $http.get(url)
                 .then(({data}) => {
                     if (data && data.data) {
                         contactService.addContact(data.data);
                         $scope.contact = angular.copy(contactService.getContact($routeParams.id));
                     }
                 })
                 .catch(err => {
                     console.log(err);
                 })
        };

        $scope.getContact();
    }
]);