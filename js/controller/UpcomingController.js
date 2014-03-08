EHM.controller('UpcomingController', function($rootScope, $scope, imageCache, upcomingRepositories) {
  console.log('upcomingController');
  $rootScope.headLine = 'Upcoming';

  $rootScope.refresh = function() {
    upcomingRepositories.updateList($scope);
  };

  imageCache.init().then(function() {
    upcomingRepositories.populate($scope);
  });

});
