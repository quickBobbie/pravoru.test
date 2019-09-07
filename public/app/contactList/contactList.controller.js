angular.module('app').controller('contactListController', [
    '$scope',
    '$rootScope',
    '$http',
    function($scope, $rootScope, $http) {
        $scope.contacts = [];
        $scope.search = '';

        $scope.getContacts = async () => {
            try {
                let url = `${[$rootScope.API_URL, 'contact'].join('/')}?search=${$scope.search}`;
                let { data } = await $http.get(url);

                if (data && data.data) {
                    $scope.contacts = angular.copy(data.data);
                }
            } catch(err) {
                console.log(err);
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