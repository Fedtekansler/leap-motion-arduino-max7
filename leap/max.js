var net = require('net');
var main = require('./mix-grained.js');

// this client only sends
var client = new net.Socket();

var themeOne = [["1", "2"], ["3", "4"], ["5", "6"], ["7", "8"]];
var themeTwo = [["9", "10"], ["11", "12"], ["13", "14"], ["15", "16"]];
var themeThree = [["17", "18"], ["19", "20"], ["21", "22"], ["23", "24"]];
var themeFour = [["25", "26"], ["27", "28"], ["29", "30"], ["31", "32"]];

var theme = 1; 

exports.changeForwards = function(time) {	
	theme++;
	if (theme == 5) {
		theme = 1;
	}
}

exports.changeBackwards = function(time) {
	theme--;
	if (theme == 0) {
		theme = 5;
	} 
}

exports.playTune = function(zone, number) {
	console.log("Zone is " + zone);
	console.log("Number is + " number);
	var song;
	switch (theme) {
		case 1: 
			song = themeOne[zone-1][number-1];
		case 2:
			song = themeTwo[zone-1][number-1];
		case 3:
			song = themeThree[zone-1][number-1];
		case 4:
			song = themeFour[zone-1][number-1];			
	}
	sendSocket(song);
}



function sendSocket(song) {
	client.connect(6000, '127.0.0.1', function() {
	  client.write(song);
	  client.destroy();
	});

	client.on('close', function() {
	  console.log('Output is: ' + song);
	});	
}
