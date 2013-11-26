/* global angular: true */
var EHM = angular.module('EHM', []).config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'templ/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/upcoming', {
    templateUrl: 'templ/upcoming.html',
    controller: 'UpcomingController'
  });

  $routeProvider.when('/logout', {
    templateUrl: '',
    controller: 'LogoutController'
  });

  $routeProvider.otherwise({
    redirectTo: '/login'
  });
});

EHM.run(function($rootScope, $location, auth, menu, error) {

  $rootScope.$on('$routeChangeSuccess', function(event, next) {
    error.hide();
    if ($location.path() !== '/login' && !auth.isLoggedIn()) {
      $location.path('/login');
    }
    if (next.$$route && next.$$route.controller) {
      var c = next.$$route.controller.split('Controller')[0].toLowerCase();
      $rootScope.bodyClass = c;
    }
  });

  $rootScope.menu = menu;
});

