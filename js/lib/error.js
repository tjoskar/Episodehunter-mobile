/* global EH: true*/
EH.factory('error', function() {
  var error = {
    show: false,
    header: '',
    mesages: []
  };
  return {
    isShowing: function() {
      return error.show;
    },
    show: function() {
      error.show = true;
      return this;
    },
    hide: function() {
      error.show = false;
      return this;
    },
    setHeader: function(header) {
      error.header = header;
      return this;
    },
    getHeader: function() {
      return error.header;
    },
    setMesage: function(mesages) {
      if (mesages instanceof Array) {
        error.mesages = mesages;
      } else if (typeof mesages === 'string' || mesages instanceof String) {
        error.mesages.push(mesages);
      }
      return this;
    },
    getMesage: function() {
      return error.mesages;
    }
  };
});
