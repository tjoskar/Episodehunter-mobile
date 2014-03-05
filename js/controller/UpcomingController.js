EHM.controller('UpcomingController', function($rootScope, $scope, imageCache, upcomingRepositories) {
  console.log('upcomingController');
  $rootScope.headLine = 'Upcoming';

  $rootScope.refresh = function() {};

  imageCache.init($scope).then(function() {

    $rootScope.refresh = function() {
      upcomingRepositories.updateList($scope);
    };

    upcomingRepositories.populate($scope);

  });

});
