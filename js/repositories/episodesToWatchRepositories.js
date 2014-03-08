/* global EpisodeCollection: true, Episode: true */
EHM.factory('episodesToWatchRepositorie', function($http, storage, auth, error, imageCache) {
  var episodesToWatchRepositorie = {};

  var populateCollection = function(episodes, $scope) {
    var collection = new EpisodeCollection();

    for (var i in episodes) {
      collection.addEpisode(new Episode(episodes[i], $scope, imageCache));
    }

    $scope.episodesToWatch = collection;
  };

  episodesToWatchRepositorie.updateList = function($scope) {
    var user = auth.getUser();
    EH.ajaxStart();
    $http.post(EH.url.api+'tv/episodestowatch', {
      'username': user.username,
      'apikey': user.apikey
    }).success(function(episodes) {
      if (EH.isset(episodes.value)) {
        storage.set('episodestowatch', episodes.value, 86400000); // A day in milliseconds according to Google.
        populateCollection(episodes.value, $scope);
      } else {
        error.setHeader('Can not connect to the server, try again later').show();
      }
      EH.ajaxStop();
    }).error(function() {
      error.setHeader('Can not connect to the server, try again later').show();
      EH.ajaxStop();
    });
  };

  episodesToWatchRepositorie.populate = function($scope) {
    var episodes = storage.get('episodestowatch');
    if (episodes !== null) {
      populateCollection(episodes, $scope);
      if (storage.isObsolete()) {
        this.updateList($scope);
      }
    } else {
      this.updateList($scope);
    }
  };

  return episodesToWatchRepositorie;

});
