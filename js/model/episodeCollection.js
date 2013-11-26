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

function Episode(_episode) {
  if (!(this instanceof Episode)) {
    return null;
  }

  var showID          = _episode.showid || 0;
  var episodeID       = _episode.episodeid || 0;
  var show            = _episode.showname || '';
  var timestamp       = _episode.timestamp || '';
  var season          = _episode.season || -1;
  var episode         = _episode.episode || -1;
  var episodeName     = _episode.episodename || '';
  var images          = _episode.image || '';

  var date = '';

  this.getShowName = function() {
    return show;
  };

  this.getDate = function() {
    if (timestamp === '') {
      return '';
    }
    if (date === '') {
      var now = new Date();
      var d = new Date(timestamp);
      if (d instanceof Date) {
        date = EH.days[d.getDay()] + ', ' + EH.month[d.getMonth()] + ' ' + d.getDate();
        if (d.getFullYear() > now.getFullYear()) {
          date += ' ' + d.getFullYear();
        }
      }
    }
    return date;
  };

  this.getEpisode = function() {
    if (season < 0 && episode < 0) {
      return '';
    }
    var SE = 'S';
    if (season < 10) {
      SE += '0' + season;
    } else {
      SE += season;
    }
    SE += 'E';
    if (episode < 10) {
      SE += '0' + episode;
    } else {
      SE += episode;
    }
    return SE;
  };

  this.getEpisodeName = function() {
    return episodeName;
  };

  this.getEpisodeImage = function() {
    if (images) {
      return EH.url.shows.fanart + images + '/8';
    }
    return '';
  };

}
