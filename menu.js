'use strict'
var readline = require('readline');
var chalk = require('chalk');

var player1 = {
    inventory:['house', 'car', 'shield']
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function selectedItem(){
    var highlightedRow = process.stdout.rows-(player1.inventory.length-selected);
    readline.cursorTo(process.stdout, 0, highlightedRow);
    readline.clearLine(process.stdout, 0);
    process.stdout.write(chalk.bgGreen(player1.inventory[selected]));
}

function draw(){
    var inventoryRows = process.stdout.rows-player1.inventory.length;
    readline.cursorTo(process.stdout, 0, inventoryRows);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(player1.inventory.join("\n"));
}
var selected = 0;

draw();
selectedItem();

process.stdin.setEncoding('utf8');
process.stdin.on("data", function(data) {
    if(data[0]=== 'w' && selected != 0){
        selected-=1;
        draw();
        selectedItem();
    }else if(data[0] === 's' && selected != player1.inventory.length-1){
        selected+=1;
        draw();
        selectedItem();
    }else if(data[0] === ' '){
        console.log("You've selected "+selected);
        return player1.inventory[selected];
    }
})

function updateInventoryList(){
    selectedItem();
    draw();
}