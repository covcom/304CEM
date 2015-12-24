
/* This is configuration block, it gets executed during the registration and configuration phase. It allows providers and constants to be injected. */
var app = angular.module('myApp', [])
/* This is a run block which get executed after the configuration block has finished, it kickstarts the application. */
app.controller('shopController', function($scope) {
  /* The $scope object contains references to all the properties in the view (defined by ng-model attributes). */
  $scope.quantity = 1
  $scope.price = 1.00
  $scope.tax = 0.0
  $scope.discount = 0.0
  /* Functions can be stored in these properties as well. These one is referenced in the ng-change attributes */
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
    /* Finally we can pass a value back to the view by setting its property. */
    $scope.total = total.toFixed(2)
    console.log(" ")
  }
})