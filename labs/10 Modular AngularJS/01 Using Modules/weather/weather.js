angular.module('components', []).directive('category', function () {
return {
    restrict: 'E',
    scope: {},
    templateUrl: 'weather.html',
    controller: function ($scope, $http, $attrs) {
        $http({
            url: "api/FeaturedProducts/" + $attrs.catName,
            method: "get"
        }).success(function (data, status, headers, config) {
            $scope.Cat = data;
        }).error(function (data, status, headers, config) {
            $scope.data = data;
            $scope.status = status;
        });

    }
}
});
