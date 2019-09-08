angular.module('app').controller('contactMutationController', [
    '$scope',
    '$rootScope',
    '$http',
    '$routeParams',
    '$location',
    'contactService',
    function($scope, $rootScope, $http, $routeParams, $location, contactService) {
        $scope.isAdd = !$routeParams.id;
        $scope.contact = {
            firstName: "",
            lastName: "",
            phone: "",
        };

        $scope.createContact = () => {
            let url = [$rootScope.API_URL, 'contact', 'create'].join('/');

            $http.post(url, $scope.contact)
                .then(({ data }) => {
                    if (data && data.data) {
                        alert("success");
                        return $location.path('#/')
                    }

                    alert("Ooops")
                })
                .catch(err => {
                    console.log(err);
                })
        };

        $scope.updateContact = () => {
            let url = [$rootScope.API_URL, 'contact', 'update', $routeParams.id].join('/');

            $http.put(url, $scope.contact)
                .then(({ status }) => {
                    if (status && status === 200) {
                        alert("success");
                        return $location.path('#/');
                    }

                    alert("Ooops")
                })
                .catch(err => {
                    console.log(err);
                })
        };

        const getContact = () => {
            let contact = contactService.getContact($routeParams.id);

            if (!Object.keys(contact).length) {
                return getContactFromServer();
            }

            for (let property in $scope.contact) {
                $scope.contact[property] = angular.copy(contact[property]);
            }
        };

        const getContactFromServer = () => {
            let url = [$rootScope.API_URL, 'contact', $routeParams.id].join('/');

            $http.get(url)
                .then(({data}) => {
                    if (data && data.data) {
                        contactService.addContact(data.data);
                        let contact = contactService.getContact($routeParams.id);

                        for (let property in $scope.contact) {
                            $scope.contact[property] = angular.copy(contact[property]);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
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