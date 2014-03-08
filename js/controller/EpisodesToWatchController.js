EHM.controller('EpisodesToWatchController', function($rootScope, $scope, imageCache, episodesToWatchRepositorie, $http, auth, storage, error) {
  $rootScope.headLine = 'Episodes to Watch';

  $rootScope.refresh = function() {
    episodesToWatchRepositorie.updateList($scope);
  };

  imageCache.init().then(function() {
    episodesToWatchRepositorie.populate($scope);
  });

});
