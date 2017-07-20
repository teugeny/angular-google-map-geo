'use strict';
/**
 * Collection of services
 * @type {module}
 */
var app = angular.module('app');

/**
 * Authorisate service
 */
app.factory('Auth', function($http, $cookieStore){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { email: '', role: userRoles.public };

    $cookieStore.remove('user');

    /**
     * Change current user
     * @param user
     */
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        /**
         * Authorizate user
         * @param accessLevel
         * @param role
         * @returns {number}
         */
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }

            return accessLevel.bitMask & role.bitMask;
        },
        /**
         * Check if user logged or not
         * @param user
         * @returns {boolean}
         */
        isLoggedIn: function(user) {
            if(user === undefined) {
                user = currentUser;
            }
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        /**
         * Add new user method
         * @param user
         * @param success
         * @param error
         */
        addUser: function(user, success, error) {
            $http.post('/adduser', user).success(function(res) {
                //changeUser(res);
                success(res);
            }).error(error);
        },
        /**
         * Login user method
         * @param user
         * @param success
         * @param error
         */
        login: function(user, success, error) {
            $http.post('/login', user).success(function(user){
                changeUser(user);
                success(user);
            }).error(error);
        },
        /**
         * Logout method
         * @param success
         * @param error
         */
        logout: function(success, error) {
            $http.post('/logout').success(function(){
                changeUser({
                    email: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});

/**
 * User service
 */
app.factory('Users', function($http) {
    return {
        /**
         * Get all users
         * @param success
         * @param error
         */
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});

/**
 * Google maps api
 */
app.factory('GoogleMaps', function ($http) {
    return {
        /**
         * Show searched location on the map
         * @param address
         * @param success
         * @param error
         */
        getMap: function (address, success, error) {
            $http.post('/map',{address:address}).success(success).error(error);
        }
    }
});