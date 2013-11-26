EHM.controller('LoginController', function($scope, auth, error) {
  console.log('LoginController');
  $scope.error = error;

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.login = function() {
    auth.login($scope.credentials);
  };
});
