/* global angular: true */
var EH = angular.module('app', []).config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'templ/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/upcoming', {
    templateUrl: 'templ/upcoming.html',
    controller: 'upcomingController'
  });

  $routeProvider.otherwise({
    redirectTo: '/login'
  });
});

EH.run(function($rootScope, menu, error) {

  $rootScope.$on('$routeChangeSuccess', function(ev,data) {
    if (data.$$route && data.$$route.controller) {
      var c = data.$$route.controller.split('Controller')[0].toLowerCase();
      $rootScope.bodyClass = c;
      error.hide();
    }
  });

  $rootScope.menu = menu;
});

