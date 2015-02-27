(function(){
    "use strict";

    angular.module('flickrSearch', ['ngMaterial'])
        .config(function($mdThemingProvider) {
           $mdThemingProvider.theme('default')
               .primaryPalette('orange')
               .accentPalette('yellow');
        })
        .controller('ListController', ['$scope', '$http', function($scope, $http){

            $scope.results = [];

            $scope.isSearching = false;

            $scope.search = function() {

                $scope.isSearching = true;

                $http({
                    method: 'GET',
                    url: 'https://api.flickr.com/services/rest',
                    params: {
                        method: 'flickr.photos.search',
                        api_key: '092d451058f0008113e5bce02063bd2b',
                        text: $scope.searchTerm,
                        format: 'json',
                        nojsoncallback: 1
                    }
                }).success(function(data){

                    $scope.results = data;
                    $scope.isSearching = false;

                }).error(function(error){
                    console.error(error);
                    $scope.isSearching = false;
                });

            };

        }]);

})();