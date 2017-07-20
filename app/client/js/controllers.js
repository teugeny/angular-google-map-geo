'use strict';

/**
 * Controllers
 * @type {module}
 */

var app = angular.module('app');

/**
 * Navigation controller
 * Use to separate navigation items depends on access role
 */
app.controller('NavCtrl',
    [
        '$rootScope',
        '$scope',
        '$location',
        'Auth',
        function($rootScope, $scope, $location, Auth) {
            $scope.user = Auth.user;
            $scope.userRoles = Auth.userRoles;
            $scope.accessLevels = Auth.accessLevels;

            $scope.logout = function() {
                Auth.logout(function() {
                    $location.path('/login');
                }, function() {
                    $rootScope.error = "Failed to logout";
                });
            };
        }
    ]
);

/**
 * Login controller
 * use to authorization users
 */
app.controller('LoginCtrl',
    [
        '$rootScope',
        '$scope',
        '$location',
        '$window',
        'Auth',
        function($rootScope, $scope, $location, $window, Auth) {

            $scope.rememberme = true;
            $scope.login = function() {
                Auth.login({
                        email: $scope.email,
                        password: $scope.password,
                        rememberme: $scope.rememberme
                    },
                    function(res) {
                        $location.path('/dashboard');
                    },
                    function(err) {
                        $rootScope.error = "Failed to login";
                    });
            };
        }
    ]
);

/**
 * Add new user controller
 * register new users
 */
app.controller('AddUserCtrl',
    [
        '$rootScope',
        '$scope',
        '$location',
        'Auth',
        function($rootScope, $scope, $location, Auth) {
            $scope.role = Auth.userRoles.user;
            $scope.userRoles = Auth.userRoles;

            $scope.addUser = function() {
                Auth.addUser({
                        email: $scope.email,
                        password: $scope.password,
                        role: $scope.role
                    },
                    function(response) {
                        $scope.users = response;
                        $scope.loading = false;
                        $("#addUserModal").modal('hide');
                    },
                    function(err) {
                        $rootScope.error = err;
                    });
            };
        }
    ]
);

/**
 * Admin controller
 * use to show users and add new one
 */
app.controller('AdminCtrl',
    [
        '$rootScope',
        '$scope',
        'Users',
        'Auth',
        function($rootScope, $scope, Users, Auth) {
            $scope.loading = true;
            $scope.userRoles = Auth.userRoles;

            Users.getAll(function(res) {
                $scope.users = res;
                $scope.loading = false;
            }, function(err) {
                $rootScope.error = "Failed to fetch users.";
                $scope.loading = false;
            });
        }
    ]
);

/**
 * Dashboard Controller
 * use for logged users to search address throw google maps api
 */
app.controller('DashboardCtrl',
    [
        '$scope',
        'Auth',
        'GoogleMaps',

        function ($scope, Auth, GoogleMaps) {
            $scope.user = Auth.user;
            $scope.userRoles = Auth.role;
            $scope.accessLevels = Auth.accessLevels;

            $scope.AddressSearch = function () {
                GoogleMaps.getMap($scope.address, function (res) {
                    var result = {
                        time: res.time,
                        location: res.response[0].geometry.location
                    };
                    mapGUI.show(result.location);
                    $scope.req_map = {
                        time: result.time,
                        address: res.response[0].formatted_address,
                        location: result.location.lat + ' , ' + result.location.lng
                    };
                },function (err) {
                    console.log(err);
                })
            };
        }
    ]
);

