angular.module('routeToy', ['ngRoute'])
    .factory('UserService', [

        function () {

            var status = {
                isLoggedIn: false,
                username: '',
                password: ''
            }
            return {
                get: function () {
                    return status;
                },
                set: function (aUsername, aPassword) {
                    status.username = aUsername;
                    status.password = aPassword;
                    status.isLoggedIn = true;
                    return status;
                },
                reset: function () {
                    console.log('user service reset');
                    status = {
                        isLoggedIn: false,
                        username: '',
                        password: ''
                    }
                    return status;
                }
            };
        }])
    .config(['$routeProvider',
        function ($routeProvider) {

            $routeProvider.when('/overview', {
                templateUrl: 'lab09_01_routing_intro5_comp_overview.html',
                controller: 'OverviewCtrl as overviewCtrl'
            })
                .when('/login', {
                    templateUrl: 'lab09_01_routing_intro5_comp_login.html'
                })
                .when('/details', {
                    templateUrl: 'lab09_01_routing_intro5_comp_details.html',
                    controller: 'DetailsCtrl as detailsCtrl'
                })
                .otherwise({
                    redirectTo: '/overview'
                });
      }])
    .controller('MainCtrl', ['UserService',
                         function (UserService) {
            var self = this;
            self.userService = UserService;
        }])
    .controller('OverviewCtrl', ['$http',
        function ($http) {
            var self = this;
            self.dbNames = [];
            $http({
                url: 'http://127.0.0.1:5984/_all_dbs',
                method: 'GET'
            }).
            success(function (data, status, headers, config) {
                self.dbNames = data;
                console.log(self.dbNames);
            }).
            error(function (data, status, headers, config) {
                self.dbNames = ['somethign wrong with your code, line 38!', ''];
            })
        }])
    .controller('LoginCtrl', ['UserService', '$location',
                          function (UserService, $location) {
            console.log('original user ' + UserService.get().username + UserService.get().password + UserService.get().isLoggedIn);
            var self = this;
            console.log('reset login from user controller');
            UserService.reset();
            console.log('after reset ' + UserService.get().username + UserService.get().password);
            self.login = function () {
                UserService.set(self.username, self.password);
                console.log('set new user ' + UserService.get().username + UserService.get().password);
                console.log('line 79 login status ' + UserService.get().isLoggedIn);
                $location.path('/overview');
            };
        }])
    .controller('DetailsCtrl', ['UserService', '$location', '$http',
                            function (UserService, $location, $http) {
            console.log('original user ' + UserService.get().username + UserService.get().password + UserService.get().isLoggedIn);
            var self = this;
            var isLoggedIn = UserService.get().isLoggedIn;
            var url = 'http://127.0.0.1:5984/people/_all_docs\?include_docs=true';
            self.docs = {};
            console.log(url);
            if (isLoggedIn) {
                $http({
                    url: url,
                    method: 'GET',
                    withCredentials: true,
                    headers: {
                        'Authorization': auth_hash(UserService.get().username, UserService.get().password)
                        //      'Authorization': auth_hash('normalname', 'normalpass')
                    }
                }).
                success(function (data, status, headers, config) {
                    self.docs = data.rows;
                    console.log(self.docs);
                    console.log(UserService.get().username + UserService.get().password);
                }).
                error(function (data, status, headers, config) {
                    console.log('somethign wrong with your username/password, line 98');
                    $location.path('/login');
                    $location.replace();
                })
            } else {
                console.log('try to login first, line 103');
                $location.path('/login');
                $location.replace();
            }

            function auth_hash(username, password) {
                return 'Basic ' + btoa(username + ':' + password);
            }

        }]);