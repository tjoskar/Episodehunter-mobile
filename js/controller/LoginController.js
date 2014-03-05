EHM.controller('LoginController', function($rootScope, $scope, auth) {
  console.log('LoginController');

  $rootScope.refresh = false;

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function() {
    auth.login($scope.credentials);
  };
});
