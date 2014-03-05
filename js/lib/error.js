EHM.factory('error', function() {

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
      if (EH.isArray(mesages)) {
        error.mesages = mesages;
      } else if (EH.isString(mesages)) {
        error.mesages.push(mesages);
      }
      return this;
    },

    getMesage: function() {
      return error.mesages;
    }

  };
});
