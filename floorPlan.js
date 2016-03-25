'use strict';

var readlineSync = require('readline-sync');
var Room = require('./Room.js');
var Items = require('./items.js');
var Monster = require('./monster.js');
var DijkstrasAlgorithm = require('./dijkstrasAlgorithm.js')

class UnionFind{
  constructor(nodeList){
    this.nodeList = nodeList;
    this.data = [];
    for(var i = 0; i<nodeList.length; i++){
      this.data[i] = i;
    }
  }
  find(index){
    var finder = index;
    while(this.data[finder] != finder){
      finder = this.data[finder];
    }
    return finder;
  }
  union(indexLeft, indexRight){
    var leftRoot = this.find(indexLeft);
    var rightRoot = this.find(indexRight);
    if(leftRoot === rightRoot){
      return false;
    }else if(leftRoot<rightRoot){
      this.data[leftRoot] = rightRoot;
      return true;
    }else{
      this.data[rightRoot] = leftRoot;
      return true;
    }
  }
  sameSet(room1, room2){
    var foo = this.nodeList.indexOf(room1);
    var bar = this.nodeList.indexOf(room2);
    foo = this.find(foo);
    bar = this.find(bar);
    if(foo === bar){
      return true;
    }else{
      return false;
    }
  }
  namedUnion(room1, room2){
    var foo = this.nodeList.indexOf(room1);
    var bar = this.nodeList.indexOf(room2);
    this.union(foo, bar);
  }
}

class Graph{
  constructor(directed){
    //set to false for Undirected graph
    this.directed = (directed === undefined ? true : !!directed);
    this.adjList = {};
    this.vertices = new Set();
  }
  addVertex(vert){
    if(this.vertices.has(vert)){
      throw new Error('Vertex "' + vert + '" has already been added');
    }
    this.vertices.add(vert);
    this.adjList[vert] = {};
  }
  addEdge(node1, node2, weight){
    weight = (weight === undefined ? 1 :weight);
    if(!this.adjList[node1]){
      this.addVertex(node1);
    }
    if(!this.adjList[node2]){
      this.addVertex(node2);
    }
    this.adjList[node1][node2] = (this.adjList[node1][node2] || 0) + weight;
    if(!this.directed){
      this.adjList[node2][node1] = (this.adjList[node2][node1] || 0) + weight;
    }
  }
  neighbors(node1){
    return Object.keys(this.adjList[node1]);
  }
  edge(node1, node2){
    return this.adjList[node1][node2];
  }
}

var roomNumber = {'dungeon':12, 'hall':17, 'battlements':10, 'throne':20};

function roomGenerator(area){
  var areaLevel = 0;
  if(area === 'dungeon'){
      areaLevel = 12;
  }else if(area === 'hall'){
      areaLevel = 29;
  }else if(area === 'battlements'){
      areaLevel = 39;
  }else if(area === 'throne'){
      areaLevel = 59;
  }
  //areaLevel sets the last Room to create, and relies on rooms.roomTotal to start the graph
  // rooms.roomTotal should equal the areaLevel after the graph is created
  var holder = new Graph(false);
  for(var i = rooms.roomTotal; i < areaLevel; i++){
    for(var j = rooms.roomTotal; j < areaLevel; j++){
      if(i != j){
        var weightRandom = Items.randy(0,1000);
        holder.addEdge(i, j, weightRandom);
      }
    }
  }
  return holder;
}

var sortable = [];//allows for testing
var count = 0;//allows for testing

function randomizeMSTDungeon(area){
  var newMap = new Graph(false);
  var generated = roomGenerator(area);
  //sortable = []; out for testing
  //sort using generated.adjList
  for(var i = 0; i < Object.keys(generated.adjList).length; i++ ){
    for (var each in generated.adjList[i]){
      sortable.push([i.toString(), each, generated.adjList[i][each]]);
    }
    sortable.sort(function(a,b){return a[2]-b[2]});
  }
  //console.log(sortable);
  for(var i = 0; i < sortable.length; i++){
    if(sortable[i][0] > sortable[i][1]){
      var short = sortable[i][0];
      sortable[i][0] = sortable[i][1];
      sortable[i][1] = short;
    }
  }
  //console.log(sortable);
  //deletes 
  var newUnion = new UnionFind(Object.keys(generated.adjList));
  //var count = 0; out for testing
  var edgeCount = 0;
  while(edgeCount < roomNumber[area]-1 && count < sortable.length){
    if(!newUnion.sameSet(sortable[count][0], sortable[count][1])){
      newUnion.namedUnion(sortable[count][0], sortable[count][1]);
      newMap.addEdge(sortable[count][0], sortable[count][1], sortable[count][2]);
      edgeCount++;
    }
    count++; 
  }
  return newMap;
}


//var ha = randomizeMSTDungeon('battlements');
//console.log(ha);

function createMonster(area, level){
	var name = Monster.monsterName[Items.randy(0, (Monster.monsterName.length)-1)];
	return new Monster.Monster(name, area, level);
}

var castleArea = {
	dungeon:[1,1], 
	hall:[2,1.25], 
	battlements:[3,1.5],
	throne:[4,2]
}

function randomExitName(){
	var namesOfExits = ['Cupboard', 'Door', 'Portal', 'Window', 'Secret Dresser Drawer'];
  //rewrite with cutouts for convertToRooms
	return namesOfExits[Items.randy(0,namesOfExits.length)]; 
}
var rooms = {};
rooms['roomTotal'] = 0;//will need to increase eachtime a room is created
//else the new rooms will get written over previous rooms

var castleRoomNames = {
    dungeon:['Unlocked Cell', 'Cell corridor', 'Secret cupboard', 'Torture Chamber', 'Dirty Cell', 'Refuse Pit', "Warden's Office", 
    'Unoccupied Cell', 'Kennels', 'Closet', 'Mop room', 'Hallway'],
    hall:['Kitchen', 'Dining Room', 'Pantry', 'Armory', 'Maids Quarters', "Chef's office", "Servent's Quarters", 'Hallway',
    'Ballroom', 'Music Room', 'Washroom', 'Medical lab', 'Warehouse', 'Gym', 'Barracks', 'Theatre', 'Boiler Room'],
    battlements:['Northern Wall', 'Southern Wall', 'Western Wall', 'Eastern Wall', 'NorthEast Tower', 'NorthWest Tower',
    'SouthEast Tower', 'SouthWest Tower', 'Portcullis', 'Castle Roof'],
    throne:['Ballroom', 'Guardroom', 'Dining hall', "Queen's Chambers", "King's Chambers", "Prince's Quarters",
    'Atrium', 'Hallway', 'Sitting Room', 'Porch', 'Lanai', 'Kitchen', 'Cloister', 'Cupboard under the stairs', 
    'Smoking Room', 'Observatory', 'Conservatory', 'Greenhouse', 'Staff Quarters', 'Closet']
}


function convertToRooms(area){
  var newGameMap = randomizeMSTDungeon(area);
  var startingRoom = rooms.roomTotal;
  var totalRoomsToFinish = rooms.roomTotal + roomNumber[area];
  var monsterCreate, content;
  var monsterCount = roomNumber[area]/2;
  var exitSet = [];
  for(rooms.roomTotal; rooms.roomTotal < totalRoomsToFinish; rooms.roomTotal++){
    content = [];
    monsterCreate = Items.randy(1,2);
    if(monsterCreate === 1 && monsterCount > 0){
      content = [createMonster(area, castleArea[area][0])];
      monsterCount--;
    }else{
        var itemsCreate = Items.randy(1,2);
        if(itemsCreate === 1){
            content = [new Items.HealthPot(castleArea[area][0])];
        }else{
            content = [new Items.RepairKit()];
        }
    }
    //need to refine the room names, splices off the ends of the array so rooms dont get names
    var randomRoomNameIndex = Items.randy(0, castleRoomNames[area].length); 
    
    var roomName = castleRoomNames[area][randomRoomNameIndex];
    castleRoomNames[area].splice(randomRoomNameIndex, 1); 
    exitSet.push(new Room.Room(rooms.roomTotal, area, null, null, content, roomName));
  }
  var finalRoom = DijkstrasAlgorithm.dijkstra(newGameMap, startingRoom);
  //console.log(startingRoom);
  //console.log(exitSet);
  //console.log(newGameMap.adjList);
  //console.log(i, rooms.roomTotal, startingRoom, 'h');
  //console.log(rooms.roomTotal);
  var longestPath = Object.keys(finalRoom[0]).reduce(function(a, b){ return finalRoom[0][a] > finalRoom[0][b] ? a : b });
  //console.log(Room.gameMap);
  for(var i = 0; i < rooms.roomTotal; i++){
    for(var j in newGameMap.adjList[i]){
      //console.log(i, rooms.roomTotal, startingRoom);
      Room.gameMap[i+startingRoom].exit[randomExitName()] = exitSet[j-startingRoom].id;
      if(i === Number(longestPath)){
        Room.gameMap[i].staircase = true;
        Room.gameMap[i].exit['StairCase'] = null;
      }
    }
  }
  //console.log(Room.gameMap);
  return newGameMap;
}

module.exports = {
  Graph:Graph,
  convertToRooms:convertToRooms,
  rooms:rooms
}