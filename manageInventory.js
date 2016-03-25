'use strict'

var readlineSync = require('readline-sync');
var InventoryMenu = require('./inventoryMenu.js');
var Items = require('./items.js');

function management(itemChosen, player1, ReadLineSync){
    switch(itemChosen.type){
        case 'kit':
            player1.inventory.splice(player1.inventory.indexOf(itemChosen),1);
            var equiped = [];
            equiped.push(player1.equipedarmor);
            equiped.push(player1.equipedweapon);
            InventoryMenu.displayMenu(equiped, console.log);
            var toRepair = InventoryMenu.listener(equiped, ReadLineSync);
            toRepair.durability = 1.0;
            break;
        case 'potion':
            itemChosen.drink(player1);
            player1.inventory.splice(player1.inventory.indexOf(itemChosen), 1);
            break;
        case 'armor':
            console.log('Would you like to Swap this armor with your equiped armor or Discard it?');
            var input = readlineSync.question('>[]');
            if(input.charAt(0).toLowerCase() === 's'){
                player1.inventory.splice(player1.inventory.indexOf(itemChosen), 1);
                player1.inventory.push(player1.equipedarmor);
                player1.equipedarmor = itemChosen;
            }else if(input.charAt(0).toLowerCase() === 'd'){
                player1.inventory.splice(player1.inventory.indexOf(itemChosen), 1);
            }
            break;
        case 'weapon':
            console.log('Would you like to Swap this weapon with your equiped weapon or Discard it?');
            var input = readlineSync.question('>[]');
            if(input.charAt(0).toLowerCase() === 's'){
                player1.inventory.splice(player1.inventory.indexOf(itemChosen), 1);
                player1.inventory.push(player1.equipedweapon);
                player1.equipedweapon = itemChosen;
            }else if(input.charAt(0).toLowerCase() === 'd'){
                player1.inventory.splice(player1.inventory.indexOf(itemChosen), 1);
            }
            break;
    }
}

module.exports = {
    management:management
}