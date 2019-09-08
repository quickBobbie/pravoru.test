angular.module('app').controller('contactInfoController', [
    '$scope',
    '$rootScope',
    '$http',
    '$routeParams',
    '$location',
    'contactService',
    function($scope, $rootScope, $http, $routeParams, $location, contactService) {
        $scope.contact = {};

        const getContact = () => {
            contactService.getContact($rootScope.API_URL, $routeParams.id, (err, contact, response) => {
                if (contact) {
                    $scope.contact = angular.copy(contact);
                } else {
                    alert("Ooops! Something went wrong.");
                }
            })
        };

        $scope.deleteContact = () => {
            if (confirm("Are you sure you want to delete the contact?")) {
                contactService.deleteContact($rootScope.API_URL, $scope.contact._id, (err, contacts) => {
                    if (err) {
                        alert("Ooops! Something went wrong.");
                    }

                    $location.path('/');
                })
            }
        };

        getContact();
    }
]);