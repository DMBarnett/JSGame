'use strict';
var items = require('./items.js');
var gameMap = require('./Room.js').gameMap;
var readLineSync = require('readline-sync');
var Combat = require('./combat.js');
var FloorPlan = require('./floorPlan.js');
var Room = require('./Room.js');

class Player{
	constructor(name, type){
		// Name is open, type is either warrior or rogue
		this.name = name;
		this.type = type;
		this.level = 1;
        
		this.experience = 0;
		this.equipedweapon = new items.StarterWeapon();
		this.equipedarmor = new items.StarterArmor();
		//immediatly called function using()(type);
		//need to fix this.foo bug in JS using fat arrow(=>)
		this.strength = ((type)=>{
			var baseStrength = 1;
			if(firstLetter(type)==='w'){
				baseStrength = 10*this.level;
			}else{
				baseStrength = 5*this.level;
			}
			return baseStrength;
		})(type);
		this.agility = ((type)=>{
			var baseAgility = 1;
			if(firstLetter(type)==='w'){
				baseAgility = 5*this.level;
			}else{
				baseAgility = 10*this.level;
			}
			return baseAgility;
		})(type);
		this.armorhealth = (10*this.level);
		this.baseHealth = 50;
		this.location = 0;
		this.castleLevel = 'dungeon';
        this.inventory = [];
	}
	attack(target){
		this.target = target;
		this.damage = ((type)=>{
			if(firstLetter(this.type)==='w'){
				return (this.equipedweapon.damage+(this.strength+this.equipedweapon.strength+this.equipedarmor.strength));
			}else{ 
				return (this.equipedweapon.damage+(this.agility+this.equipedarmor.agility+this.equipedweapon.agility));
			}
		})();
		console.log('You did ' + this.damage + ' damage to the ' + target.name);
		target.baseHealth-=this.damage;
		//new console.log below might not work
		console.log('The '+ target+"'s health is now "+ target.baseHealth);
	}
	toString(){
		var results = 'Your name is ' + this.name + ', and you are a ' + this.type;
		return results;
	}
    
}


function firstLetter(wordHere){
	return (wordHere.charAt(0).toLowerCase());
}

function levelSwitch(player1){
	if(player1.castleLevel === 'dungeon'){
		player1.castleLevel = 'hall';
	}else if(player1.castleLevel === 'hall'){
		player1.castleLevel = 'battlements';
	}else if(player1.castleLevel === 'battlements'){
		player1.castleLevel = 'throne';
	}
    return player1;
}

function movePlayer(player1, moveTo){
    //console.log(Room.gameMap[player1.location]);
    if(moveTo === 'StairCase' && player1.castleLevel === 'throne' && Room.gameMap[player1.location].id > 38){
        Room.gameMap[FloorPlan.rooms.roomTotal] = new Room.Room(Room.roomTotal, 'throne', null, null, ,'Throne Room');
        movePlayer(player1, FloorPlan.rooms.roomTotal);
    }
    if(moveTo === 'StairCase' && Room.gameMap[player1.location].exit.StairCase === null){
        var nextRoom = FloorPlan.rooms.roomTotal;
        Room.gameMap[player1.location].exit.StairCase = nextRoom;
		levelSwitch(player1);
		FloorPlan.convertToRooms(player1.castleLevel);
        console.log(Room.gameMap);
        Room.gameMap[nextRoom].exit['Downstairs'] =  player1.location;
        movePlayer(player1, nextRoom);
    }
    if(moveTo in gameMap[player1.location].exit){
        player1.location = gameMap[player1.location].exit[moveTo];
        //console.log('You move to ' + gameMap[player1.location].id);
        //console.log(gameMap[player1.location].toStringContent());
    }
}

function playerAction(player1){
	var contentLocal = gameMap[player1.location].content;
	if(contentLocal != 'nothing.'){
		console.log('What would you like to do?');
		var action = readLineSync.question('You can Attack, or Move to another room :');
		if(firstLetter(action) === 'a'){
			Combat.combat(player1, contentLocal);
		}else if(firstLetter(action) === 'm'){
			movePlayer(player1);
		}
	}
}

var player1 = new Player('David', 'w', items.axeStarter, items.armorStarter);

module.exports={
	Player:Player,
	firstLetter:firstLetter,
	movePlayer:movePlayer,
	playerAction:playerAction
}