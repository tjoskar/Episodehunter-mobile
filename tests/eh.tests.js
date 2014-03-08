describe('helper function', function(){

    it('should check if string', function() {
        expect(EH.isString('val')).toEqual(true);
        expect(EH.isString(NaN)).toEqual(false);
        expect(EH.isString(1)).toEqual(false);
        expect(EH.isString(null)).toEqual(false);
        expect(EH.isString(false)).toEqual(false);
        expect(EH.isString(undefined)).toEqual(false);
        expect(EH.isString({})).toEqual(false);
    });

    it('should check if array', function() {
        expect(EH.isArray([1])).toEqual(true);
        expect(EH.isArray([,])).toEqual(true);
        expect(EH.isArray([])).toEqual(true);
        expect(EH.isArray({})).toEqual(false);
        expect(EH.isArray(undefined)).toEqual(false);
        expect(EH.isArray(1)).toEqual(false);
        expect(EH.isArray(NaN)).toEqual(false);
        expect(EH.isArray(false)).toEqual(false);
    });

    it('should check if int', function() {
        expect(EH.isInt(1)).toEqual(true);
        expect(EH.isInt(Number.MAX_VALUE)).toEqual(false);  // Believe it or not
        expect(EH.isInt(Number.MIN_VALUE)).toEqual(false);  // Believe it or not
        expect(EH.isInt(Infinity)).toEqual(false);          // Believe it or not
        expect(EH.isInt([])).toEqual(false);
        expect(EH.isInt({})).toEqual(false);
        expect(EH.isInt(undefined)).toEqual(false);
        expect(EH.isInt(NaN)).toEqual(false);
        expect(EH.isInt(false)).toEqual(false);
    });

    it('should check if variable is set', function() {
        var value = '';
        expect(EH.isset(1)).toEqual(true);                  // R-value
        expect(EH.isset(value)).toEqual(true);              // L-value
        expect(EH.isset(null)).toEqual(false);
        expect(EH.isset(undefined)).toEqual(false);
    });

    it('should convert convert string to int', function() {
        expect(EH.int('1')).toEqual(1);
        expect(EH.int('1.9')).toEqual(1);
        expect(EH.int('-1')).toEqual(-1);
        expect(EH.int('Not a number')).toBeNaN();
        expect(EH.int('a')).toBeNaN();
        expect(EH.int(NaN)).toBeNaN();
        expect(EH.int(null)).toBeNaN();
        expect(EH.int([])).toBeNaN();
        expect(EH.int({})).toBeNaN();
        expect(EH.int(undefined)).toBeNaN();
        expect(EH.int(true)).toBeNaN();
    });

    it('should get the current time', function() {
        var timestamp = 1391677820622;
        spyOn(Date.prototype, 'getTime').andReturn(timestamp);
        expect(EH.time()).toEqual(timestamp);
    });

    it('should get the text Sunday', function() {
        var actual = EH.getNextSunday(new Date('2014', '11', '01'));
        var expected = new Date('2014', '11', '07');
        expect(actual.toUTCString()).toEqual(expected.toUTCString());

        actual = EH.getNextSunday(new Date('2014', '01', '06'));
        expected = new Date('2014', '01', '09');
        expect(actual.toUTCString()).toEqual(expected.toUTCString());
    });

    it('should convert json to object', function() {
        var json = {};
        expect(EH.jsonParse(json)).toEqual({});
        expect(EH.jsonParse(1)).toEqual(1);
    });

    it('return next day', function() {
        var timestamp = 1394288888570;
        spyOn(Date.prototype, 'getTime').andReturn(timestamp);
        expect(EH.getFutureDate(1)).toEqual('2014-03-09');
    });

    it('return previous day', function() {
        var timestamp = 1394288888570;
        spyOn(Date.prototype, 'getTime').andReturn(timestamp);
        expect(EH.getFutureDate(-1)).toEqual('2014-03-07');
    });

    it('return two digit month', function() {
        var timestamp = 1394288888570;
        spyOn(Date.prototype, 'getTime').andReturn(timestamp);
        expect(EH.getFutureDate(250)).toEqual('2014-11-13');
    });

});
