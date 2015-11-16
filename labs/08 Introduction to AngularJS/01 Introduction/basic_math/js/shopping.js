// Creates a new module called 'calculatorApp'
        angular.module('calculatorApp', []);

        // Registers a controller to our module 'calculatorApp'.
        angular.module('calculatorApp').controller('CalculatorController', function CalculatorController($scope) {
          $scope.z = 0;
          $scope.sum = function() {
            $scope.z = $scope.x + $scope.y;
          };
        });

        // load the app
        angular.element(document).ready(function() {
            angular.bootstrap(document, ['calculatorApp']);
        });