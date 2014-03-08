/* global inject */
describe('Test error class', function(){
    var _error;

    beforeEach(module('EHM'));

    beforeEach(inject(function(error) {
        _error = error;
    }));

    it('should be hidden per default', function() {
        expect(_error.isShowing()).toBe(false);
    });

    it('should return itself when displayed', function() {
        var r = _error.show();

        expect(_error.isShowing()).toBe(true);
        expect(r).toEqual(_error);
    });

    it('should return itself on hide', function() {
        var r = _error.hide();

        expect(_error.isShowing()).toBe(false);
        expect(r).toEqual(_error);
    });

    it('should set header', function() {
        var str = 'header';
        var e = _error.setHeader(str);

        expect(e.getHeader()).toEqual(str);
        expect(e).toEqual(_error);
    });

    it('should set a single message', function() {
        var str = 'message';
        var e = _error.setMesage(str);

        expect(e.getMesage()).toEqual([str]);
        expect(e).toEqual(_error);
    });

    it('should set multi messages', function() {
        var str = 'message';
        var e = _error.setMesage([str]);
        e = _error.setMesage(str);

        expect(e.getMesage()).toEqual([str, str]);
        expect(e).toEqual(_error);
    });
});
