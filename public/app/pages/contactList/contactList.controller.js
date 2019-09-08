angular.module('app').controller('contactListController', [
    '$scope',
    '$rootScope',
    '$http',
    'contactService',
    function($scope, $rootScope, $http, contactService) {
        $scope.contacts = [];
        $scope.search = '';

        $scope.getContacts = () => {
                let url = `${[$rootScope.API_URL, 'contact'].join('/')}?search=${$scope.search}`;
                $http.get(url)
                    .then(({data}) => {
                        if (data && data.data) {
                            let contactList = data.data;
                            contactService.setContacts(contactList);
                            $scope.contacts = angular.copy(contactService.getContactList());
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
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