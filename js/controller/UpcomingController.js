/* global EHM: true, console: true, EpisodeCollection: true, Episode: true, EH: true */
EHM.controller('UpcomingController', function($scope, $http, auth, storage, error) {
  console.log('upcomingController');
  $scope.error = error;

  $scope.refresh = function() {
    console.log('refresh');
  };

  function populateUpcoming(episodes) {
    var episode, d;
    var thisWeek = new EpisodeCollection('');
    var nextWeek = new EpisodeCollection('next week');
    var upcoming = new EpisodeCollection('upcoming');
    var TBA      = new EpisodeCollection('TBA');

    var now = new Date();
    var thisSunday = EH.getNextSunday(now);
    var nextSunday = EH.getNextSunday(thisSunday);

    for (var i in episodes) {
      episode = episodes[i];
      if (!EH.isset(episode.episodeid)) {
        TBA.addEpisode(new Episode(episode));
        continue;
      }
      d = new Date(episode.timestamp + ' 00:00:00');
      if (d <= thisSunday) {
        thisWeek.addEpisode(new Episode(episode));
      } else if (thisSunday < d && d <= nextSunday) {
        nextWeek.addEpisode(new Episode(episode));
      } else {
        upcoming.addEpisode(new Episode(episode));
      }
    }

    $scope.episodeCollections = [
      thisWeek,
      nextWeek,
      upcoming,
      TBA
    ];

    // See issue #127
    setTimeout(function() {
      var i = 0;
      console.log('Lets cache');
      $('#view img').each(function() {
        var $img = $(this);
        i++;
        console.log(i);
        ImgCache.isCached($img.data('cached'), function(path, success){
          if(success){
            // already cached
            $img.attr('src', $img.data('cached'));
            ImgCache.useCachedFile($img);
            console.log('already cached');
          } else {
            console.log('not there, need to cache the image');
            ImgCache.cacheFile($img.data('cached'), function(){
              $img.attr('src', $img.data('cached'));
              ImgCache.useCachedFile($img);
            });
          }
        });
      });
    }, 1000);
  }

  function updateList() {
    EH.ajaxStart();
    $http.post(EH.url.api+'tv/upcoming', {
      'username': user.username,
      'apikey': user.apikey
    }).success(function(episodes) {
      storage.set('upcoming', episodes, 86400000); // A day in milliseconds according to Google.
      populateUpcoming(episodes);
      EH.ajaxStop();
    }).error(function() {
      error.setHeader('Can not connect to the server, try again later').show();
      EH.ajaxStop();
    });
  }

  var user = auth.getUser();
  var episodes = storage.get('upcoming');
  if (episodes !== null) {
    populateUpcoming(episodes);
    if (storage.isObsolete()) {
      updateList();
    }
  } else {
    updateList();
  }

  if (storage.isObsolete()) {
    updateList();
  }
});


