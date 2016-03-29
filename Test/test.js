
// Sets up testing
var chai = require('chai');
var assert = chai.assert;

var game = require('../game.js');
var area = game.area;
var items = require('../items.js');
var Player = require('../player.js').Player;
var Monster = require('../monster.js').Monster;
var RoomModule = require('../Room.js');
var Weapon = items.Weapon;
var Room = require('../Room.js').Room;
var Armor = items.Armor;
var Combat = require('../combat.js')
var PlayerObject = require('../player');
var GameMap = require('../Room.js').gameMap;
var FloorPlan = require('../floorPlan.js');
var ManageInventory = require('../manageInventory.js');
var PlayerFile = require('../player.js');

var weaponNames = ['Hammer', 'Sword', 'Mace', 'Axe'];
var armorNames = ['Steel Breastplate', 'Leather Breastplate', 'Iron Breastplate'];


describe('FinalFantasy0.5', function(){
	it('should have player object', function(){
		var player1 = new Player('John', 'Warrior');
		assert.equal(player1.name, 'John', ['name problem']);
		assert.equal(player1.type, 'Warrior', 'class problem');
		assert.deepEqual(player1.equipedweapon, items.axeStarter);
		assert.deepEqual(player1.equipedarmor, items.armorStarter);
		assert.equal(player1.agility, 5);
		assert.equal(player1.strength, 10);
	})
	it('should have weapon object', function(){
		var weapon1 = new Weapon();
		assert.isAbove(weapon1.strength, 0);
		assert.isBelow(weapon1.strength, 6);
		assert.isAbove(weapon1.agility, 0);
		assert.isBelow(weapon1.agility, 6);
		assert.isAbove(weapon1.damage, 0);
		assert.isBelow(weapon1.damage, 31);
	})
	it('should have armor object', function(){
		var armor1 = new Armor();
		assert.isAbove(armor1.strength, 0);
		assert.isBelow(armor1.strength, 6);
		assert.isAbove(armor1.agility, 0);
		assert.isBelow(armor1.agility, 6);
		assert.isAbove(armor1.armorDmg, 0);
		assert.isBelow(armor1.armorDmg, 101);
	})
	it('should have monster object', function(){
		var monster1 = new Monster('Bill', 'dungeon', Math.floor(Math.random()*3)+1);
		assert.equal(monster1.name, 'Bill');
		assert.isAbove(monster1.expgiven, 99);
		assert.isBelow(monster1.expgiven, 301);
		assert.isAbove(monster1.strength, 0);
		assert.isBelow(monster1.strength, 4);
		assert.isAbove(monster1.agility, 0);
		assert.isBelow(monster1.agility, 4);
		assert.isAbove(monster1.baseHealth, 49);
		assert.isBelow(monster1.baseHealth, 151);
		assert.isObject(monster1.dropable, ['has an object']);
	})
	it('should have a room object', function(){
		var room1 = new Room(1, 'hall', {});
		assert.equal(room1.description, 'There\'s nothing here');
		//console.log(room1+'');
		assert.deepEqual(room1.content, []);
	})
	it('should gain exp', function(){
		var player2 = new Player('John', 'Warrior', items.axeStarter, items.armorStarter);
		var monster2 = new Monster('Bill', 'dungeon', 1);
		var randMock = {random:function(){return 1}};
		Combat.gainexp(monster2, player2, randMock);
		assert.equal(player2.experience, 100);
		assert.equal(player2.level, 1);
	})
	it('should level up', function(){
		var player3 = new Player('John', 'Warrior');
		var monster3 = new Monster('Bill', 'dungeon', 10);
		var randMock = {random:function(){return 1}};
		Combat.gainexp(monster3, player3, randMock);
		assert.equal(player3.experience, 0);
		assert.equal(player3.level, 2);
		assert.equal(player3.strength, 14);
		assert.equal(player3.agility, 9);
		assert.equal(player3.baseHealth, 150);
	})
	it('should have monsters', function(){
		var monster2 = new Monster('A', 'dungeon', 1);
		var monster3 = new Monster('B', 'hall', 2);
		var monster4 = new Monster('C', 'battlements', 3);
		var monster5 = new Monster('D', 'throne', 4);
	})
	it('should do combat', function(){
		var monster1 = new Monster('A', 'dungeon', 2);
		var player1 = new Player('B', 'w');
        var fakeReadLine = {question: function(){return 'a'}}
		Combat.fightMonster(monster1, player1, fakeReadLine);
        assert.isBelow(monster1.baseHealth, 5);
	})
    it('should swap equipment', function(){
        var player1 = new Player('D', 'r');
        var armor1 = new Armor();
        var room1 = new Room(0, 'dungeon', null, null, [armor1]);
        Combat.swapEquipment(player1);
        assert.equal(player1.equipedarmor, armor1);
        assert.deepEqual(room1.content, []);
    })
    it('should drop and pick up item', function(){
        var player1 = new Player('D', 'r');
        var room1 = new Room(10, 'dungeon', null, null, []);
        var monster1 = new Monster('A', 'dungeon', 1);
        monster1.dropable = new Armor();
        room1.content.push(monster1);
        player1.location = 10;
        var fakeReadLine = {question: function(){return 'y'}};
        Combat.dropItem(monster1, player1, fakeReadLine);
        assert.equal(player1.equipedarmor, monster1.dropable);
        assert.deepEqual(room1.content, []);
    })
     it('should leave equipment', function(){
        var player1 = new Player('D', 'r');
        var room1 = new Room(8, 'dungeon', null, null, []);
        var monster1 = new Monster('A', 'dungeon', 1);
        monster1.dropable = new Armor();
        room1.content.push(monster1);
        player1.location = 8;
        var fakeReadLine = {question: function(){return 'n'}};
        Combat.dropItem(monster1, player1, fakeReadLine);
        assert.notEqual(player1.equipedarmor, monster1.dropable);
        assert.deepEqual(room1.content, [monster1.dropable]);
    })
    it('should let you run away', function(){
        var player1 = new Player('David', 'r');
        var room1 = new Room(15, 'dungeon', null, null, []);
        var room2 = new Room(16, 'dungeon', null, null, []);
        room1.exit['Door 16'] = 16;
        room2.exit['Door 15'] = 15;
        player1.location = 15;
        var monster1 = new Monster('Quail', 'dungeon', 1);
        var fakeReadLine = {question: function(){return 'r'}}
        Combat.fightMonster(monster1, player1, fakeReadLine);
        assert.equal(player1.location, 16);
    })
    it('should move to the next floor', function(){
        //need to update this test
        RoomModule.clearMap();
        var player1 = new Player('David', 'r');
        var room1 = new Room(11, 'dungeon', null, null, [], 'two');
        room1.exit['StairCase'] = null;
        room1.staircase = true;
        player1.location = 11;
        FloorPlan.rooms.roomTotal = 12;
        var fakeReadLine = 'Staircase';
        console.log(player1.location, player1.castleLevel);
        PlayerFile.movePlayer(player1, fakeReadLine);
        console.log(RoomModule.gameMap);
        console.log(player1);
        console.log(FloorPlan.rooms.roomTotal);
        assert.deepEqual(player1.castleLevel, 'hall');
        assert.deepEqual(player1.location, 12);
    })
    it('should use and delete health Potions from inventory', function(){
        var player1 = new Player('David', 'r');
        player1.baseHealth = 20;
        var testPotion = new items.HealthPot(1);
        player1.inventory.push(testPotion);
        ManageInventory.management(testPotion, player1);
        assert.deepEqual(player1.inventory, []);
        assert.deepEqual(player1.baseHealth, 30);
    })
    it('should use and delete Repair kits from inventory', function(){
        var player1 = new Player('David', 'r');
        player1.equipedweapon.durability = 0.2;
        var testKit = new items.RepairKit();
        player1.inventory.push(testKit);
        var fakeReadLine = {question: function(){ return 'b'}};
        ManageInventory.management(testKit, player1, fakeReadLine);
        assert.deepEqual(player1.inventory, []);
        assert.deepEqual(player1.equipedweapon.durability, 1.0);
    })
    it('should swap armor from inventory', function(){
        var player1 = new Player('David', 'r');
        var starterArmor = player1.equipedarmor;
        var testArmor = new Armor();
        var testKit = new items.RepairKit();
        player1.inventory.push(testKit, testArmor);
        ManageInventory.management(testArmor, player1);
        assert.deepEqual(player1.equipedarmor, testArmor);
        assert.deepEqual(player1.inventory, [testKit, starterArmor]);
    })
    it('should swap weapons from inventory', function(){
        var player1 = new Player('David', 'r');
        var starterWeapon = player1.equipedweapon;
        var testWeapon = new Weapon();
        var testKit = new items.RepairKit();
        player1.inventory.push(testKit, testWeapon);
        ManageInventory.management(testWeapon, player1);
        assert.deepEqual(player1.equipedweapon, testWeapon);
        assert.deepEqual(player1.inventory, [testKit, starterWeapon]);
    })
})