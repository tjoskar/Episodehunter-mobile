/* exported EpisodeCollection, Episode */
/* jshint unused: false */
function EpisodeCollection(_headline, _episodes) {
  if (!(this instanceof EpisodeCollection)) {
    return null;
  }

  var headline = _headline || '';
  var episodes = _episodes || [];

  this.getHeadline = function() {
    return headline;
  };

  this.setHeadline = function(headline) {
    headline = headline;
  };

  this.getEpisodes = function() {
    return episodes;
  };

  this.addEpisode = function(episode) {
    episodes.push(episode);
  };

  this.removeEpisode = function(e) {
    if (EH.isInt(e) && e >= 0) {
      episodes.splice(e, 1);
    }
  };

}

function Episode(_episode, $scope) {
  if (!(this instanceof Episode)) {
    return null;
  }

  var _showID          = _episode.showid      || 0;
  var _episodeID       = _episode.episodeid   || 0;
  var _show            = _episode.showname    || '';
  var _timestamp       = _episode.timestamp   || '';
  var _seasonNr        = _episode.season      || -1;
  var _episodeNr       = _episode.episode     || -1;
  var _episodeName     = _episode.episodename || '';
  var _image           = _episode.image       || '';
  var _date            = '';

  this.image = ''; // Default image

  if (_image) {
    var i = EH.url.shows.fanart + _image + '/8';
    var $img = $('<img src="" alt="">'); // Temp
    var that = this;
    ImgCache.isCached(i, function(path, success) {
      if(success){
        // already cached
        ImgCache.useCachedFileWithSource($img, i, function() {
          that.image = $img.attr('src');
          $scope.$apply();
        });
      } else {
        // not there, need to cache the image
        ImgCache.cacheFile(i, function(){
          ImgCache.useCachedFileWithSource($img, i, function() {
            that.image = $img.attr('src');
            $scope.$apply();
          });
        });
      }
    });
  }

  this.getShowName = function() {
    return _show;
  };

  this.getDate = function() {
    if (_timestamp === '') {
      return '';
    }
    if (_date === '') {
      var now = new Date();
      var d = new Date(_timestamp);
      if (d instanceof Date) {
        _date = EH.days[d.getDay()] + ', ' + EH.month[d.getMonth()] + ' ' + d.getDate();
        if (d.getFullYear() > now.getFullYear()) {
          _date += ' ' + d.getFullYear();
        }
      }
    }
    return _date;
  };

  this.getEpisode = function() {
    if (_seasonNr < 0 && _episodeNr < 0) {
      return '';
    }
    var SE = 'S';
    if (_seasonNr < 10) {
      SE += '0' + _seasonNr;
    } else {
      SE += _seasonNr;
    }
    SE += 'E';
    if (_episodeNr < 10) {
      SE += '0' + _episodeNr;
    } else {
      SE += _episodeNr;
    }
    return SE;
  };

  this.getEpisodeName = function() {
    return _episodeName;
  };

}
