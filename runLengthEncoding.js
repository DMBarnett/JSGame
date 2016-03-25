//run length encoding
// input aaabbbbccccc and return 3a4b5c
// input aaabbbbcccccd and return 3a4b5cd

function runLE(input){
	var output = [];
	var working = []; 
	for(var i = 0; i < input.length; i++){
		working.push(input[i]);
	}
	var count = 0;
	var currentLetter = working[0];
	for(var i = 0; i < working.length+1; i++){
		if(working[i] === currentLetter){
			currentLetter = working[i];
			count++;
			//console.log('first');
		}else{
			if(count > 1){
				output.push(count);
			}
			output.push(currentLetter);
			count = 1;
			currentLetter = working[i];
			}
		}
	output = output.join('');
	return output;
}

var test0 = runLE('aaaaa');
var test1 = runLE('aaabbbbccccc');
var test2 = runLE('aaabbbbcccccd');
//var test3 = runLE('aabbccdefffffffaaaaaabbbbb');

function extractLE(input){
	var output = [];
	for(var ) 
}