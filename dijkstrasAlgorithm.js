'use strict'
//Dijkstra's algorithm
var PriorityQ = require('algorithms').DataStructures.PriorityQueue;

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