'use strict'

var readlineSync = require('readline-sync');
var Room = require('./Room.js');
var Monster = require('./monster.js');
var Items = require('./items');
var Game = require('./game.js');
var Player = require('./player.js');
var Combat = require('./combat.js');
var Weapon = Items.Weapon;
var Armor = Items.Armor;
var NewGame = require('./newGame.js');
var FloorPlan = require('./floorPlan.js'); 
var InventoryMenu = require('./inventoryMenu.js');
var ManageInventory = require('./manageInventory.js');
var playerInput = '';
var player1;
var gameMap = Room.gameMap;

FloorPlan.convertToRooms('dungeon');
//console.log(JSON.stringify(gameMap, null, 2));

while(playerInput != 'quit'){
	if(player1 === undefined){
		player1 = NewGame.newPlayer();
		console.log('You find yourself in a room, with the door left unlocked.');
	}
    console.log('You are currently in the ' + gameMap[player1.location].roomName);
	console.log('You can exit the room through the following: ' + gameMap[player1.location].toStringExit());
	//console.log(''+ gameMap[player1.location].toStringContent());
	console.log('What would you like to do? You can Move, Attack, Pick up, Swap equipement, manage Inventory, or Look around.');
	var inputWhileLoop = readlineSync.question('>[]');
	switch(Player.firstLetter(inputWhileLoop)){
		case 'a':
			var target1;
			if(gameMap[player1.location].content.length === 0){
				console.log('Theres nothing to attack!');
				break;
			}
			target1 = gameMap[player1.location].content[0];
			if(!(target1 instanceof Monster.Monster)){
				console.log('You cant attack that!');				
			}else{
				Combat.combat(target1, player1)
			}
			break;
		case 'm': 
            if(Room.gameMap[player1.location].staircase === true){
                console.log('This room will take you to the next castle level if you chose the StairCase');
            }
			var movePlayerTo = readlineSync.question('Where would you like to go? :')
            Player.movePlayer(player1, movePlayerTo);
			break;
		case 's':
            if(Room.gameMap[player1.location].content.length === 0){
                console.log("There's nothing to pick up.")
            }else{
                var  printable = Room.gameMap[player1.location].content 
                console.log('' + printable);
                console.log('This is what you have equiped');
                console.log('' + player1.equipedarmor);
                var switchable = readlineSync.question('Would you like to swap this equipement with yours? :');
                if(switchable.charAt(0).toLowerCase() === 'y'){
			         Combat.swapEquipment(player1, gameMap[player1.location].content);
                }
            }
			break;
		case 'p':
			if(player1.inventory.length >= 8){
				var overFlowing = readlineSync.question("You've no more room for items! Would you like to manage your Inventory?: ");
				if(overFlowing[0].toLowerCase() === 'y'){
					var itemToDelete = InventoryMenu.choiceMenu(player1.inventory, console.log, readlineSync);
                    InventoryMenu.deleteItem(itemToDelete, player1);
				}else{
                    console.log('You leave the item on the ground.');
					break;
				}
			}
			var itemToPickUp = InventoryMenu.choiceMenu(Room.gameMap[player1.location].content, console.log, readlineSync);
            if(itemToPickUp != null){    
			    Items.pickUpItem(player1, itemToPickUp);
            }
			break;
        case 'l':
            console.log('Your health is '+player1.baseHealth);
            console.log('You currently have the following items equiped.');
            console.log('' + player1.equipedweapon);
            console.log('' + player1.equipedarmor);
            console.log('You are in the '+gameMap[player1.location].roomName+' in the '+player1.castleLevel+' of the castle.');
            // needs to console.log(room, contents, exits, castleArea)
            break;
		case 'i':
            var workingItem = InventoryMenu.choiceMenu(player1.inventory, console.log, readlineSync);
            if(workingItem != null){
                ManageInventory.management(workingItem, player1, readlineSync);
            }
			break;
		case 'q':
			playerInput = 'quit';
			break;
	}
}