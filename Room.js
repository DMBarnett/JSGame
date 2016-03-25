'use strict';

var gameMap = {};

class Room{
	//needs id, description, content, exits(nameOrdirectionOf and destinationId)
	constructor(id, area, exit, description, content, roomName){
		this.id = id;
		this.area = area;
		this.exit = exit || {};
		this.description = description || 'There\'s nothing here';
		this.content = content || [];
		this.staircase = false;
        this.roomName = roomName || null;
		if(gameMap[this.id] === undefined){
			gameMap[this.id] = this;
		};
	}
	//toString method, will return available to console.log version of the Room function.
	toString(){
		var results = this.description + "\n----\n";
		for(var i = 0; i < this.content.length; i++){
			results+=this.content[i];
		}			
		return results;
	};
	toStringContent(){
		var results = 'The room contains a ';
		if(Array.isArray(this.content)){ 
			for(var i = 0; i< this.content.length; i++){
				results += this.content[i].name;
			}
            if(this.content.length === 0){
                results = 'Theres nothing here.'
            }
        }else if(this.content != undefined){
            results += this.content.name;
		}else{
            results = 'Theres nothing here.'
		}
        return results;
	}
	toStringExit(){
		var results = '\n';
		for(var direction in this.exit){
			results += direction +'\n';
		}
		return results;
	}
}

function clearMap(){
    for(var each in gameMap){
        delete gameMap[each];
    }
}
//var myRoom = new Room(1, 'hall', {North:2});
//var livingRoom = new Room(2, 'hall', {South:1, North:3});

module.exports={
	Room:Room,
	gameMap:gameMap,
    clearMap:clearMap
}