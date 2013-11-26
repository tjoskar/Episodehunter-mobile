/* global EHM: true */
EHM.controller('LogoutController', function(auth) {
  auth.logout();
});
