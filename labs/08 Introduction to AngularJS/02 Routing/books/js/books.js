var myApp = angular.module('myApp', ['ngRoute'])

myApp.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/search', {
				templateUrl: 'templates/search.html',
        controller: 'searchController'
			})
			.when('/favourites', {
				templateUrl: 'templates/favourites.html',
        controller: 'favouritesController'
			})
			.otherwise({
				redirectTo: '/search'
			});
	}])


myApp.controller('searchController', function($scope) {
  $scope.message = 'This is the search screen';
});
 
 
myApp.controller('favouritesController', function($scope) {
  $scope.message = 'This is the favourites screen';
})
