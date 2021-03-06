/* exported local */
var EH = {};
var local = true;

EH.url = {
  'apikey': 'http://episodehunter.tv/api/user/apikey',
  'api': 'http://api.episodehunter.tv/mobile/',
  'movie': {
    'poster': 'http://img.episodehunter.tv/movie/poster/',
    'fanart': 'http://img.episodehunter.tv/movie/fanart/'
  },
  'shows': {
    'poster': 'http://img.episodehunter.tv/serie/poster/',
    'fanart': 'http://img.episodehunter.tv/',
    'episode': 'http://img.episodehunter.tv/episode/'
  },
  'defaultImage': {
    'poster': '1363113862.png',
    'episode': '1363113862.png'
  }
};

EH.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
EH.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

EH.isString = function(str) {
  return (typeof str === 'string' || str instanceof String);
};

EH.isArray = function(arr) {
  return arr instanceof Array;
};

EH.isInt = function(n) {
  return n === +n && n === (n|0);
};

EH.time = function() {
  return new Date().getTime();
};

EH.isset = function(variable) {
  return (typeof(variable) !== 'undefined' && variable !== null);
};

EH.int = function(str) {
  return parseInt(str, 10);
};

EH.jsonParse = function(obj) {
  try {
    obj = JSON.parse(obj);
  } catch(e) {}
  return obj;
};

EH.convertUTCDateToLocalDate = function(unixtimestamp) {
  var utcDate = new Date(unixtimestamp * 1000);

  var offset = utcDate.getTimezoneOffset() / 60;
  var hours = utcDate.getHours();

  utcDate.setHours(hours - offset);

  return utcDate;
};

EH.getNextSunday = function(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 7);
};

EH.getFutureDate = function(n) {
  var d = new Date();
  d = new Date(this.time() + (n || 0) * 86400000);
  var month = d.getMonth() + 1;
  return [
    d.getFullYear(),
    (month < 10 ? '0' + month : month),
    (d.getDate() < 10 ? '0' + d.getDate() : d.getDate())
  ].join('-');
};

EH.ajaxStart = function() {
  var $statusbar = $('#iosstatusbar');
  $statusbar.css({
    width: '0%'
  });

  $statusbar.animate({
    width: '80%',
  }, 800 );
};

EH.ajaxStop = function() {
  $('#iosstatusbar').animate({
    width: '100%',
  }, 200 );
};
