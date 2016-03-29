'use strict';
var area = require('./game.js').area;
var items = require('./items.js');

var monsterName = ['Gargoyle', 'Basilisk', 'Cow', 'Daemon', 'Pikachu', 'Horse'];

class Monster{
	constructor(name, castleLevel, level){
		//each area given a different modifier
		this.name = name;
		this.areamodifier = area[castleLevel][1];
		this.level = level;
        this.type = 'monster';
		//Should I use this.level or level?
		this.expgiven= 100*this.areamodifier*level;
		this.strength = 1*level;
		this.agility = 1*level;
		this.baseHealth = 50*this.areamodifier*level;
		this.dropable = (function(){
			var x = Math.floor(Math.random()*2);
			if(x===1){
				return new items.Weapon();
			}else if(x===0){
				return new items.Armor();
			};
		}).call(this);
	}
	slash(target){
		this.target = target;
		this.damage = (((this.strength*2)+this.agility)*this.level)+10;
		target.baseHealth = target.baseHealth-Math.max((this.damage-(target.equipedarmor.durability*target.equipedarmor.armorDmg)),0);
		if(target.equipedarmor.durability <=0.0){
			console.log('Your armor is broken!  Repair it or replace it!');
		}
        target.equipedarmor.durability = target.equipedarmor.durability-(0.05*this.level);
		console.log('The monster did ' + this.damage + ' damage.');
		console.log('Your health is ' + target.baseHealth);
	}
	toString(){
		var results = this.name;
		return results;
	}
}

module.exports={
	Monster:Monster,
	monsterName:monsterName
}