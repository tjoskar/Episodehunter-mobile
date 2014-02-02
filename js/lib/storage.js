/*
  Saves values as object:
  key: {
    value: mix,
    expiration: milliseconds
  }
*/

EHM.factory('storage', function() {
  var storage = {
    obsolete: false,
  };

  storage.isObsolete = function() {
    return storage.obsolete;
  };

  storage.setObsolete = function(bool) {
    storage.obsolete = bool;
  };

  storage.removeItem = function(key) {
    window.localStorage.removeItem(key);
  };

  storage.rawGet = function(key) {
    var v = window.localStorage.getItem(key);
    if (EH.isset(v)) {
      try {
        v = JSON.parse(v);
      } catch(e) {
        storage.removeItem(key);
        return null;
      }
      return v;
    }
    return null;
  };

  storage.get = function(key) {
    var v = storage.rawGet(key);
    if (EH.isset(v)) {
      if (v.expiration === 0 || v.expiration >= EH.time()) {
        storage.setObsolete(false);
      } else {
        storage.setObsolete(true);
      }
      return EH.jsonParse(v.value);
    }
    return null;
  };

  storage.refresh = function(key, expiration) {
    var v = storage.rawGet(key);
    if (EH.isset(v)) {
      storage.set(key, v.value, expiration);
      return EH.jsonParse(v.value);
    }
    return null;
  };

  storage.set = function(key, value, expiration) {
    expiration = expiration || 0;
    if (expiration !== 0) {
      expiration += EH.time();
    }
    if (!EH.isString(value)) {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, JSON.stringify({
      'expiration': expiration,
      'value': value
    }));
  };

  storage.clear = function() {
    window.localStorage.clear();
  };

  return storage;
});
