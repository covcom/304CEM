
var app = angular.module('myApp', [])
app.controller('todoController', function($scope) {
  
  var items = Array()

  $scope.add = function($event) {
    console.log('add()')
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
    console.log(item)
    var index = items.indexOf(item)
    if (index > -1) {
      items.splice(index, 1)
    }
  }
})