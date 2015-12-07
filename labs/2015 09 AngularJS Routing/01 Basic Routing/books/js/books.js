/*global angular  */

/* we 'inject' the ngRoute module into our app. This makes the routing functionality to be available to our app. */
var myApp = angular.module('myApp', ['ngRoute'])

/* the config function takes an array. */
myApp.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/search', {
		  templateUrl: 'templates/search.html',
      controller: 'searchController'
		})
    .when('/detail/:id', {
      templateUrl: 'templates/detail.html',
      controller: 'detailController'
    })
    .when('/favourites', {
		  templateUrl: 'templates/favourites.html',
      controller: 'favouritesController'
		})
		.otherwise({
		  redirectTo: 'search'
		})
	}])


myApp.controller('searchController', function($scope, $http) {
  $scope.message = 'This is the search screen'
  $scope.search = function($event) {
    console.log('search()')
    if ($event.which == 13) { // enter key presses
      var search = $scope.searchTerm
      console.log(search)
      var url = 'https://www.googleapis.com/books/v1/volumes?maxResults=40&fields=items(id,volumeInfo(title))&q='+search
      $http.get(url).success(function(response) {
        console.log(response)
        $scope.books = response.items
        $scope.searchTerm = ''
      })
    }
  }
})

myApp.controller('detailController', function($scope, $routeParams) {
  $scope.message = 'This is the detail screen'
  $scope.id = $routeParams.id
  $scope.addToFavourites = function(id) {
    console.log('adding: '+id+' to favourites.')
    localStorage.setItem(id, id)
  }
})
 
myApp.controller('favouritesController', function($scope) {
  console.log('fav controller')
  $scope.message = 'This is the favourites screen'
  $scope.delete = function(id) {
    console.log('deleting id '+id)
  }
  var init = function() {
    console.log('getting books')
    var items = Array()
    for (var a in localStorage) {
      items.push(localStorage[a])
    }
    console.log(items)
    $scope.books = items
  }
  init()
})
