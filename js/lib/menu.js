/* global EH: true*/
EH.factory('menu', function() {
  var activate = 'upcoming';
  return {
    set: function(state) {
      activate = state;
    },
    get: function() {
      return activate;
    },
    isActive: function(state) {
			return activate === state;
    }
  };
});

