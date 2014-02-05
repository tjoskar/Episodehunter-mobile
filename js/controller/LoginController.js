EHM.controller('LoginController', function($rootScope, $scope, auth, error) {
  console.log('LoginController');
  $rootScope.error = error;

  $rootScope.refresh = false;

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function() {
    auth.login($scope.credentials);
  };
});
