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

module.exports={
	newPlayer:newPlayer,
}