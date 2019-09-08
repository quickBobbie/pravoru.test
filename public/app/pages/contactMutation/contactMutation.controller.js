angular.module('app').controller('contactMutationController', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$location',
    'contactService',
    function($scope, $rootScope, $routeParams, $location, contactService) {
        $scope.isAdd = !$routeParams.id;
        $scope.contact = {
            firstName: "",
            lastName: "",
            phone: "",
        };

        const getContact = () => {
            contactService.getContact($rootScope.API_URL, $routeParams.id, (err, contact, response) => {
                if (err) {
                    return alert(err.data.message);
                }
                if (contact) {
                    for (let property in $scope.contact) {
                        $scope.contact[property] = angular.copy(contact[property]);
                    }
                } else {
                    alert("Ooops! Something went wrong.");
                }
            });
        };

        const validateContact = () => {
            for (let property in $scope.contact) {
                $scope.contact[property] = $scope.contact[property]
                    .replace(/<[^>]+>/g,'')
                    .replace(/\s+/gi, ' ')
                    .trim();
            }
        };

        $scope.createContact = () => {
            validateContact();
            contactService.addContact($rootScope.API_URL, $scope.contact, (err, contact, response) => {
                if (err) {
                    return alert(err.data.message);
                }
                if (contact) {
                    $location.path(`/contact/${contact._id}`);
                } else {
                    alert("Ooops! Something went wrong.");
                }
            })
        };

        $scope.updateContact = () => {
            validateContact();
            contactService.updateContact($rootScope.API_URL, $routeParams.id, $scope.contact, (err, contact, response) => {
                if (err) {
                    return alert(err.data.message);
                }
                if (contact) {
                    $location.path(`/contact/${contact._id}`);
                } else {
                    alert("Ooops! Something went wrong.");
                }
            })
        };

        $scope.submit = () => {
            if ($scope.isAdd) {
                return $scope.createContact();
            } else {
                return $scope.updateContact();
            }
        };

        $scope.$watch('isAdd', () => {
            if (!$scope.isAdd) {
                getContact();
            }
        })
    }
]);