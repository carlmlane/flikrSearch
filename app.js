(function(){
    "use strict";

    angular.module('flickrSearch', ['ngMaterial'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('light-blue');
        })
        .controller('ListController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

            $scope.results = [];

            $scope.isSearching = false;

            // TODO reformat this input
            // this function takes parameters for date range

            var dateRestriction = function () {
                var dt = new Date();
                if ($scope.dateResults == "month") {
                    dt.setMonth(dt.getMonth() - 1);
                    return dt;
                }
                else if ($scope.dateResults == "halfYear") {
                    dt.setMonth(dt.getMonth() - 6);
                    return dt;
                }
                else if ($scope.dateResults == "year") {
                    dt.setMonth(dt.getMonth() - 12);
                    return dt;
                }
                else if ($scope.dateResults == "any") {
                    dt.setFullYear(dt.getFullYear() - 100);
                    return dt;
                }
            };

            // opens larger resolution image in a new browser window

            $scope.expandMode = function (i) {
                var picture = $scope.results.photos.photo[i];
                $window.open("https://farm" + picture.farm + ".staticflickr.com/" + picture.server + "/" + picture.id + "_" + picture.secret + "_b.jpg")
            };

            // flickr API search parameters

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
                        nojsoncallback: 1,
                        per_page: $scope.numResults,
                        min_upload_date: dateRestriction(),
                        sort: 'interestingness-desc',
                        safe_search: $scope.safeSearch
                    }
                }).success(function(data){

                    $scope.results = data;
                    $scope.isSearching = false;

                }).error(function(error){
                    console.error(error);
                    $scope.isSearching = false;
                })

            };


        }]);

})();