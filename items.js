'use strict';

var Room = require('./Room.js');

var weaponNames = ['Hammer', 'Sword', 'Mace', 'Axe'];
var armorNames = ['Steel Breastplate', 'Leather Breastplate', 'Iron Breastplate', 'Gold Breastplate', 'Diamond Breastplate'];

class Weapon{
	constructor(){
		this.type = 'weapon';
		this.name = weaponNames[Math.floor(Math.random()*3)];
		this.strength = Math.floor(Math.random()*5)+1;
		this.agility = Math.floor(Math.random()*5)+1;
		this.damage = Math.floor(Math.random()*20)+10;
		this.durability = 1.0;
	}
	toString(){
		return 'This is a ' + this.name + '\n' + 
		 '-------------\n'+
		 '| A | S | Da | Dr |\n'+
		 '-------------\n'+
		 '| '+this.agility+' | '+this.strength+' | '+this.damage+' | ' +this.durability+' |\n'+
		 '-------------\n' 
	}
}

class Armor{
	constructor(){
		this.type = 'armor';
		this.name = armorNames[Math.floor(Math.random()*4)];
		this.strength = Math.floor(Math.random()*5)+1;
		this.agility = Math.floor(Math.random()*5)+1;
		this.armorDmg = Math.floor(Math.random()*100)+1;
		this.durability = 1.0;
	}
	toString(){
		return 'This is a ' + this.name + '\n' + 
		 '-------------\n'+
		 '| A | S | Da | Dr |\n'+
		 '-------------\n'+
		 '| '+this.agility+' | '+this.strength+' | '+this.armorDmg+' | ' +this.durability+' |\n'+
		 '-------------\n' 
	}
}

class StarterWeapon extends Weapon{
	constructor(){
		super();
		this.type = 'weapon';
		this.name = 'Club';
		this.strength = 2;
		this.agility = 2;
		this.damage = 10;
		this.durability = 1.0;
	}
}

class StarterArmor extends Armor{
	constructor(){
		super();
		this.type = 'armor';
		this.name = 'Robe';
		this.strength = 2;
		this.agility = 2;
		this.armorDmg = 10;
		this.durability = 1.0;
	}
}

class HealthPot{
	constructor(areaLevel){
		this.level = areaLevel;
        this.type = 'potion';
        this.name = 'Potion';
	}
	drink(player1){
		player1.baseHealth+= 10*this.level;
        if(player1.baseHealth > (player1.level*50)){
            player1.baseHealth = player1.level*50
        }
        console.log('Your health is now ' + player1.baseHealth)
        return player1.baseHealth;
	}
	toString(){
        var results = 'Level '+this.level+' potion.'; 
		return results;
	};
}

class RepairKit{
	constructor(){
		this.name = 'Armor or Weapon Repair Kit';
        this.type = 'kit';
	}
	repair(player1, targetEquipment, repairableKit){
		targetEquipment.durability = 1.0;
		player1.inventory.splice(repairableKit, 1);
		console.log(''+targetEquipment+' is now usable again!');
		return targetEquipment.durability;
	}
	toString(){
        var results = this.name;
		return results;
	}
}

var axeStarter = new StarterWeapon;
var armorStarter = new StarterArmor;

function randy(min, max){
    min = min || 0;
    max = max === undefined ? 1 : max; 
	var rand = Math;
	return Math.round(rand.random()*(max-min)+(min || 0));
}

function pickUpItem(player, itemToPickUp){
	if(itemToPickUp.type === 'monster'){
        console.log("That's not a pygmy that's a monster!  You can't put it in your pocket!");
        //could I add a setTimeout() here to pause for a second?
        return player;
    }
	player.inventory.push(itemToPickUp);
	Room.gameMap[player.location].content.splice(itemToPickUp, 1);
	return player;
}

module.exports={
	Weapon:Weapon,
	Armor:Armor,
	axeStarter:axeStarter,
	armorStarter:armorStarter,
	randy:randy,
    HealthPot:HealthPot,
	RepairKit:RepairKit,
    StarterArmor:StarterArmor,
    StarterWeapon:StarterWeapon,
    pickUpItem:pickUpItem
}