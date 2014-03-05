/* global EHM: true, EH: true*/
EHM.factory('auth', function($location, $http, error, storage) {
  var auth = {};

  auth.validTime = 2419200000; // Four weeks in milliseconds according to Google.

  auth.login = function(credentials) {
    if(credentials.username && credentials.password) {
      $http.post(EH.url.apikey, credentials).success(function(obj) {
        if (!EH.isset(obj.value) || !EH.isset(obj.value.apikey)) {
          error.setHeader('Receive bad data, try again later').show();
          return;
        }
        auth.logginUser({
          'username': credentials.username,
          'apikey': obj.value.apikey,
          'loggedin': true,
          'time': EH.time()
        });
        $location.path('/upcoming');
      }).error(function(data, status) {
        if (status === 401) {
          error.setHeader('Wrong username and/or password').show();
        } else if (status === 403) {
          error.setHeader('Your account is not activated').show();
        } else {
          error.setHeader('Can not connect to the server, try again later').show();
        }
      });
    } else {
      error.setHeader('Please fill in your username and password').show();
    }
  };

  auth.logout = function() {
    storage.removeItem('user');
    $location.path('/login');
  };

  auth.isLoggedIn = function() {
    var user = auth.getUser();
    if (user && user.loggedin) {
      return user.loggedin;
    }
  };

  auth.getUser = function() {
    return storage.refresh('user', auth.validTime);
  };

  auth.logginUser = function(user) {
    return storage.set('user', user, auth.validTime);
  };

  return auth;
});
