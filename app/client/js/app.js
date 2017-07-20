'use strict';

angular.module('app', ['ngCookies', 'ui.router'])

    .config(
        [
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

                var access = routingConfig.accessLevels;

                // Public routes
                $stateProvider
                    .state('public', {
                        abstract: true,
                        template: "<ui-view/>",
                        data: {
                            access: access.public
                        }
                    })
                    .state('public.home',{
                        url:'/',
                        templateUrl:'views/public/home.html'
                    })
                    .state('public.404', {
                        url: '/404/',
                        templateUrl: 'views/public/404.html'
                    });

                // Anonymous routes
                $stateProvider
                    .state('anon', {
                        abstract: true,
                        template: "<ui-view/>",
                        data: {
                            access: access.anon
                        }
                    })
                    .state('anon.login', {
                        url: '/login/',
                        templateUrl: 'views/public/login.html',
                        controller: 'LoginCtrl'
                    });

                // Regular user routes
                $stateProvider
                    .state('user', {
                        abstract: true,
                        template: "<ui-view/>",
                        data: {
                            access: access.user
                        }
                    })
                    .state('user.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'views/private/home.html'
                    });

                // Admin routes
                $stateProvider
                    .state('admin', {
                        abstract: true,
                        template: "<ui-view/>",
                        data: {
                            access: access.admin
                        }
                    })
                    .state('admin.admin', {
                        url: '/admin/',
                        templateUrl: 'views/private/admin.html',
                        controller: 'AdminCtrl'
                    });



                $urlRouterProvider.otherwise('/404');

                $urlRouterProvider.rule(function($injector, $location) {
                    if($location.protocol() === 'file')
                        return;

                    var path = $location.path()
                        , search = $location.search()
                        , params
                    ;

                    if (path[path.length - 1] === '/') {
                        return;
                    }

                    if (Object.keys(search).length === 0) {
                        return path + '/';
                    }

                    params = [];
                    angular.forEach(search, function(v, k){
                        params.push(k + '=' + v);
                    });
                    return path + '/?' + params.join('&');
                });

                $locationProvider.html5Mode(true);

                $httpProvider.interceptors.push(function($q, $location) {
                    return {
                        'responseError': function(response) {
                            if(response.status === 401 || response.status === 403) {
                                $location.path('/login');
                            }
                            return $q.reject(response);
                        }
                    };
                });
            }
        ]
    )

    .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if(!('data' in toState) || !('access' in toState.data)){
                $rootScope.error = "Access undefined for this state";
                event.preventDefault();
            }
            else if (!Auth.authorize(toState.data.access)) {
                $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
                event.preventDefault();

                if(fromState.url === '^') {
                    if(Auth.isLoggedIn()) {
                        $state.go('user.home');
                    } else {
                        $rootScope.error = null;
                        $state.go('anon.login');
                    }
                }
            }
        });
}]);
