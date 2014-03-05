/* global EpisodeCollection: true, Episode: true */
EHM.controller('EpisodesToWatchController', function($rootScope, $scope, $http, auth, storage, error) {
  $rootScope.headLine = 'Episodes to Watch';

  $rootScope.refresh = function() {
    updateList();
  };

  function populateCollection(episodes) {
    var collection = new EpisodeCollection();

    for (var i in episodes) {
      collection.addEpisode(new Episode(episodes[i], $scope));
    }

    $scope.episodesToWatch = collection;
  }

  function updateList() {
    EH.ajaxStart();
    $http.post(EH.url.api+'tv/episodestowatch', {
      'username': user.username,
      'apikey': user.apikey
    }).success(function(episodes) {
      if (EH.isset(episodes.value)) {
        storage.set('episodestowatch', episodes.value, 86400000); // A day in milliseconds according to Google.
        populateCollection(episodes.value);
      } else {
        error.setHeader('Can not connect to the server, try again later').show();
      }
      EH.ajaxStop();
    }).error(function() {
      error.setHeader('Can not connect to the server, try again later').show();
      EH.ajaxStop();
    });
  }

  var user = auth.getUser();
  var episodes = storage.get('episodestowatch');
  if (episodes !== null) {
    populateCollection(episodes);
    if (storage.isObsolete()) {
      updateList();
    }
  } else {
    updateList();
  }
});
