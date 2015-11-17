
var app = angular.module('myApp', [])
app.controller('todoController', function($scope) {
  
  /* an array to store the list items */
  var items = Array()

  $scope.add = function($event) {
    console.log('add()')
    /* the $event object was passed from the view and contains useful information that can be used by the controller. */
    console.log('key code: '+$event.which)
    var keyCode = $event.which || $event.keyCode
    if (keyCode === 13) {
      console.log('enter key pressed')
      var newItem = $scope.newItem
      console.log(newItem)
      items.push(newItem)
      console.log(items)
      $scope.newItem = ''
      $scope.items = items
    }
  }
  $scope.delete = function(item) {
    console.log('delete()')
  }
})