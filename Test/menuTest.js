'use strict'

var chai = require('chai');
var assert = chai.assert;
var menuPrinter = require('../inventoryMenu.js');

function outputFaker(){
    var output = [];
    return function(){
        for(var i = 0; i<arguments.length; i++){
            output.push(arguments[i])
        }
        return output;
    }
}

describe('menu to manage inventory and other choices', function(){
    it('should print list of items with alphabet selectors', function(){
        var fakeConsoleLog = outputFaker();
        menuPrinter.displayMenu(['car', 'boat', 'horse', 'airplane'], fakeConsoleLog);
        //menuPrinter.displayMenu(['car', 'boat', 'horse', 'airplane'], console.log);
        assert.deepEqual(fakeConsoleLog(), ['a-car', 'b-boat', 'c-horse', 'd-airplane'])
    })
    it('should select and return the chosen object', function(){
        var fakeReadLine = {question: function(){return 'a'}};
        var chosenObject = menuPrinter.listener(['car', 'boat', 'horse', 'airplane'], fakeReadLine);
        assert.deepEqual(chosenObject, 'car');
    })
    it('should combine both into a single menu function', function(){
        var fakeConsoleLog = outputFaker();
        var fakeReadLine = {question: function(){return 'c'}};
        var chose = menuPrinter.choiceMenu(['car', 'boat', 'horse', 'airplane'], fakeConsoleLog, fakeReadLine);
        assert.deepEqual(chose, 'horse');
        assert.deepEqual(fakeConsoleLog(), ['a-car', 'b-boat', 'c-horse', 'd-airplane']);
    })
})