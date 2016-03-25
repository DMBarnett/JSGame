'use strict'

var readlineSync = require('readline-sync');
var Room = require('./Room.js');
var monster = require('./monster.js');
var items = require('./items');
var area = require('./game.js').area;
var player = require('./player.js');

function newPlayer(){
	var question = readlineSync.question('Would you like to create a new character? :');
	if(question[0].toLowerCase() === 'y'){
		var name = readlineSync.question('What is your name? :');
		var cla = readlineSync.question('Would you like to play as a rogue or a warrior? :');
		if(cla[0].toLowerCase() != 'w' && cla[0].toLowerCase() != 'r'){
			console.log('Thats not a class you can play!');
			return newPlayer();
		}
		var playerTestPrint = new player.Player(name, cla);
		console.log(playerTestPrint);
		return playerTestPrint;
	}
}

function randomExitName(){
	var namesOfExits = ['Cupboard', 'Door', 'Portal', 'Window'];
	return namesOfExits[items.randy(0,namesOfExits.length+1)]; 
}

function createMonster(castleArea, level){
	var name = monster.monsterName[items.randy(0, (monster.monsterName.length)-1)];
	return new monster.Monster(name, castleArea, level);
}

module.exports={
	newPlayer:newPlayer,
	createMonster:createMonster
}

//where do I need to place this to work?
//needs to create each level as player moves up
