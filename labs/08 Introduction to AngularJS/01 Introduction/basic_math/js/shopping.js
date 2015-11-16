
var app = angular.module('myApp', [])
app.controller('shopController', function($scope) {
  $scope.quantity = 1
  $scope.price = 1.00
  $scope.tax = 0.0
  $scope.discount = 0.0
  $scope.getTotal = function() {
    console.log('getTotal()')
    console.log($scope.quantity)
    var total = $scope.quantity * $scope.price
	  console.log("total before tax: " + total)
    var tax = $scope.tax / 100
	  tax = tax + 1
    total = total * tax;
	  console.log("total after tax: " + total)
    total = total - $scope.discount
	  console.log("total after discount: " + total)
    $scope.total = total.toFixed(2)
    console.log(" ")
  }
})