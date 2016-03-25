'use strict'

function xeroxMachine(input){
    var result;
    if(Array.isArray(input)){
        result = input.slice();
        for(var each in input){
            result[each] = xeroxMachine(input[each]);
        }
        return result;
    }else if(typeof(input) === 'object' && input != null){
        result = {};
        for(var each in input){
            result[each] = xeroxMachine(input[each]);
        }
        return result;
    }else{
        return input;
    }
}

module.exports = {
    xeroxMachine:xeroxMachine
}