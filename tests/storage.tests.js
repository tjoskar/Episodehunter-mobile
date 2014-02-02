describe('StorageTest', function(){
    var _storage;

    beforeEach(module('EHM'));

    beforeEach(inject(function(storage) {
        _storage = storage;
        _storage.clear();
    }));

    it('should store a string', function() {
        var key = 'key';
        var val = 'value';
        _storage.set(key, val);
        var actual = _storage.get(key);

        expect(actual).toEqual(val);
    });

    it('should store a object', function() {
        var key = 'key';
        var val = {
            'key': 'val'
        };
        _storage.set(key, val);
        var actual = _storage.get(key);

        expect(actual).toEqual(val);
    });

    it('should be obsolete', function() {
        var key = 'key';
        var val = 'val';

        _storage.set(key, val, 1000);
        var storageData = _storage.get(key);
        expect(_storage.isObsolete()).toBeFalsy();

        _storage.set(key, val, -1);
        storageData = _storage.get(key);
        expect(_storage.isObsolete()).toBeTruthy();
    });
});
