'use strict'
//Dijkstra's algorithm
var PriorityQ = require('algorithms').DataStructures.PriorityQueue;

var sampleGraph = {"directed":false,"adjList":{"0":{"2":658,"8":815},"1":{"6":815},"2":{"0":658,"4":755},"3":{"6":728},"4":{"2":755,"5":837},"5":{"4":837},"6":{"1":815,"3":728,"8":731},"7":{"8":774},"8":{"0":815,"6":731,"7":774,"9":711},"9":{"8":711}},"vertices":{}}
function dijkstra(graph, source){
	for(var each in graph.adjList){
		for(var things in graph.adjList[each]){
			graph.adjList[each][things] = 1;
		}
	}
	var Q = new PriorityQ();
	var dist = {};
	dist[source] = 0;
	var prev = {};
	for(var each in graph.adjList){
		if(each != source){
			dist[each] = Infinity;
			prev[each] = undefined;
		}
		Q.insert(each, dist[each]);
	}
	while(!Q.isEmpty()){
		var u = Q.extract();
		for(var each in graph.adjList[u]){
			var alt = dist[u] + graph.adjList[u][each];
			if(alt < dist[each]){
				dist[each] = alt;
				prev[each] = u;
				Q.changePriority(each, alt);
			}
		}
	}
	var returner = [dist, prev];
	return returner;
}

var output = dijkstra(sampleGraph, 0);
var final = output[0];
var longestPath = Object.keys(final).reduce(function(a, b){ return final[a] > final[b] ? a : b });

module.exports = {
	dijkstra:dijkstra,
	longestPath:longestPath
}