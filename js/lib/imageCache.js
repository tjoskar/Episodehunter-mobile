EHM.factory('imageCache', function($q) {

  var status = {
    init: false
  };

  return {

    init: function(scope) {
      var deferred = $q.defer();

      if (status.init === true) {
        deferred.resolve('OK');
      } else {
        ImgCache.options.debug = true;

        ImgCache.init(function(){
          status.init = true;
          scope.$apply(function() {
            deferred.resolve('Cache created successfully!');
          });
        }, function(){
          scope.$apply(function() {
            deferred.reject('Check the log for errors');
          });
        });

        return deferred.promise;
      }

    },

    getCacheURI: function() {}

  };
});
