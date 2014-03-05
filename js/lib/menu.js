EHM.factory('menu', function($location) {
  var activate = 'upcoming';
  var $sidebar = $('.sidebar');

  return {

    set: function(state) {
      if (!this.isActive(state)) {
        activate = state;
        $location.path('/'+state);
        if ($sidebar.sidebar('is open')) {
          $sidebar.sidebar('hide');
        }
      }
    },

    get: function() {
      return activate;
    },

    isActive: function(state) {
			return activate === state;
    }

  };
});

