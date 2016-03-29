'use strict';
// JS game

var area = {
	dungeon:[1,1], 
	hall:[2,1.25], 
	battlements:[3,1.5],
	throne:[4,2]
}

class Boss{
	constructor(){
		this.name = 'Captn Badass McGee';
		this.baseHealth = 200;
		this.strength = 10;
		this.agility = 6;
	}
}

module.exports={
	area:area,
	Boss:Boss
}