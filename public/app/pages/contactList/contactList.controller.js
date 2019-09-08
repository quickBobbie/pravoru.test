angular.module('app').controller('contactListController', [
    '$scope',
    '$rootScope',
    '$http',
    'contactService',
    function($scope, $rootScope, $http, contactService) {
        $scope.contacts = [];
        $scope.search = '';

        $scope.getContacts = () => {
            contactService.getContactList($rootScope.API_URL, $scope.search, (err, contacts, response) => {
                if (err) {
                    return alert(err.data.message);
                }
                if (contacts && contacts.length) {
                    $scope.contacts = angular.copy(contacts);
                } else {
                    alert("Ooops! Something went wrong.");
                }
            })
        };

        $scope.deleteContact = (id) => {
            if (confirm("Are you sure you want to delete the contact?")) {
                contactService.deleteContact($rootScope.API_URL, id, (err, contacts) => {
                    if (err) {
                        return alert(err.data.message);
                    }
                    $scope.contacts = angular.copy(contacts);
                })
            }

        };

        let timeId;

        $scope.$watch('search', () => {
            if (timeId) {
                clearTimeout(timeId)
            }

            timeId = setTimeout(() => {
                $scope.getContacts();
            }, 1000);
        });

        $scope.getContacts();
    }
]);