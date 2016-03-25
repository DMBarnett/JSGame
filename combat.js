'use strict';
var readLineSync = require('readline-sync');
var Room = require('./Room.js');
var Items = require('./items.js');

function gainexp(target, character, rand){
	character.experience += target.expgiven;
	if(character.experience >= (character.level*1000)){
		character.experience -= (character.level*1000);
		character.level++;
		character.strength +=(Math.floor(rand.random()*3)+1);
		character.agility += (Math.floor(rand.random()*3)+1);
		character.baseHealth += (50*character.level);
	}
}

function swapEquipment(character){
    if(Room.gameMap[character.location].content[0].type === 'armor'){
        character.equipedarmor = Room.gameMap[character.location].content[0];
        var content = Room.gameMap[character.location].content;
        var position = content.indexOf(character.equipedarmor);
        content.splice(position, 1);
        console.log('Your equipment now ');
        console.log('' + character.equipedarmor);
    }else if(Room.gameMap[character.location].content[0].type === 'weapon'){
        character.equipedweapon = Room.gameMap[character.location].content[0];
        var content = Room.gameMap[character.location].content;
        var position = content.indexOf(character.equipedweapon);
        content.splice(position, 1);
        console.log('Your equipment now ');
        console.log('' + character.equipedweapon);
    }
}

function combat(target, character){
	fightMonster(target, character, readLineSync);
	if(character.baseHealth <= 0){
		console.log('You Died.');
		return;
	}else if(target.baseHealth<=0){
		console.log('You killed the ' +target);
		if(target.name==='Captn Badass McGee'){
			console.log('Congratulations on beating the game!');
		}else if(target.dropable != null){
            console.log('The monster dropped something!');
            console.log('' + target.dropable);
            dropItem(target, character, readLineSync);
		}
		gainexp(target, character);
	}
}

function fightMonster(target, character, readLineSync){
    var fight = true;
	while(target.baseHealth > 0 && character.baseHealth > 0 && fight === true){
		character.attack(target);
		target.slash(character);
		fight = false;
        if(target.baseHealth > 0){
            var question = readLineSync.question('Do you want to attack or run?');
            if(question.charAt(0).toLowerCase() === 'a'){
                fight = true;
            }else if(question.charAt(0).toLowerCase() === 'r'){
                var totalExits = Object.keys(Room.gameMap[character.location].exit).length-1;
                var randomExit = Items.randy(0,totalExits);
                var newSpot = Object.keys(Room.gameMap[character.location].exit)[randomExit];
                console.log(newSpot, totalExits, randomExit);
                character.location = Room.gameMap[character.location].exit[newSpot];
                console.log("You're flight takes you to " + character.location);
            }
        }
	}
}


function dropItem(target, character, readLineSync){
    var content = Room.gameMap[character.location].content;
    content.push(target.dropable);
    var position = content.indexOf(target);
    content.splice(position, 1);
    var switchable = readLineSync.question('Would you like to swap this equipment with yours? :');
    if(switchable.charAt(0).toLowerCase() === 'y'){
        swapEquipment(character);
    }
}




module.exports={
	combat:combat,
	gainexp:gainexp,
	swapEquipment:swapEquipment,
    dropItem:dropItem,
    fightMonster:fightMonster
}


    /*console.log(Room.gameMap[character.location].content);
    console.log('The monster dropped something.\n' + target.dropable);
    console.log('You currently have some items equiped. \n' + character.equipedarmor + ' and \n' + character.equipedweapon);*/