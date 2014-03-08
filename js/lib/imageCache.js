EHM.factory('imageCache', function($q) {

  var status = {
    init: false
  };

  return {

    init: function() {
      var deferred = $q.defer();

      if (status.init === true) {
        deferred.resolve('OK');
      } else {
        ImgCache.options.debug = true;

        ImgCache.init(function(){
          status.init = true;
          deferred.resolve('Cache created successfully!');
          // scope.$apply(function() {
          //   deferred.resolve('Cache created successfully!');
          // });
        }, function(){
          deferred.reject('Check the log for errors');
          // scope.$apply(function() {
          //   deferred.reject('Check the log for errors');
          // });
        });
      }

      return deferred.promise;

    },

    getCacheURI: function(url, episode, scope) {
      var $img = $('<img src="" alt="">'); // Temp
      ImgCache.isCached(url, function(path, success) {
        if(success){

          // already cached
          ImgCache.useCachedFileWithSource($img, url, function() {
            episode.image = $img.attr('src');
            scope.$apply();
          });

        } else {

          // not there, need to cache the image
          ImgCache.cacheFile(url, function() {
            ImgCache.useCachedFileWithSource($img, url, function() {
              episode.image = $img.attr('src');
              scope.$apply();
            });
          });

        }
      });

    }

  };
});
