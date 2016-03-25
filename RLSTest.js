'use strict'

var readlineSync = require('readline-sync');

var hello = readlineSync.question('What is your name? :');
console.log(hello);