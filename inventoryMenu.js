'use strict'

var readLineSync = require('readline');

function displayMenu(inputChoices, outputDestination){
    for(var i = 0; i< inputChoices.length; i++){
        outputDestination(String.fromCharCode(97+i)+'-'+inputChoices[i]);
    }
}

function listener(arrayOfChoices, readLineSync){
    var actionableObject = readLineSync.question('Which would you like to use?: ');
    var choices = arrayOfChoices;
    var locationOfObject = actionableObject.charCodeAt(0)-97;
    var chosenObject = choices[locationOfObject];
    return chosenObject;
}

function choiceMenu(inputChoices, outputFn, readLineSync){
    if(inputChoices.length > 0){
        displayMenu(inputChoices, outputFn);
        var chosen = listener(inputChoices, readLineSync);
        return chosen;
    }else{
        console.log("There's nothing here.");
        var forceBreak = null;
        return forceBreak;
    }
}

function deleteItem(itemToDelete, player1){
    player1.inventory.splice(player1.inventory.indexOf(itemToDelete), 1);
}

module.exports = {
    displayMenu:displayMenu,
    listener:listener,
    choiceMenu:choiceMenu,
    deleteItem:deleteItem
}