'use strict'

var chai = require('chai');
var assert = chai.assert;
var XeroxMachine = require('../XeroxMachine.js');

describe('Deep copies', function(){
    it('should copy simple vars', function(){
        var foo = 1;
        var bar = XeroxMachine.xeroxMachine(foo);
        assert.deepEqual(bar, foo);
    })
    it('should deep copy arrays', function(){
        var foo = [1,2,3];
        var bar = XeroxMachine.xeroxMachine(foo);
        assert.notEqual(bar, foo);
        assert.deepEqual(bar, foo);
    })
    it('should copy objects', function(){
        var foo = {1:'dog', horse:'pig', barn:{kid:'goat'}};
        var bar = XeroxMachine.xeroxMachine(foo);
        assert.notEqual(bar, foo);
        assert.deepEqual(bar, foo);
        assert.notEqual(foo.barn, bar.barn);
    })
    it('should copy arrays of objects', function(){
        var foo = [{1:'dog'},{horse:'pig'},{barn:{kid:'goat'}}];
        var bar = XeroxMachine.xeroxMachine(foo);
        assert.notEqual(bar, foo);
        assert.deepEqual(bar, foo);
        assert.notEqual(foo[2], bar[2]);
    })
    it('should deal with null', function(){
        var foo = null;
        var bar = XeroxMachine.xeroxMachine(foo);
        assert.equal(bar, foo);
    })
})