/* global EH: true*/
EH.factory('auth', function($location, error) {
  return {
    login: function(credentials) {
      if(credentials.username && credentials.password) {
        $location.path('/upcoming');
        // $scope.error.setHeader('Your username and/or password is wrong').show();
      } else {
        error.setHeader('Please fill in your username and password').show();
      }
    },
    logout: function() {

    }
  };
});
