var net = require('net');
var main = require('./mix-grained.js');

// this client only sends
var client = new net.Socket();
var songs = ["1", "2", "3"];
var currentSong = 0;
var length = songs.length - 1;

exports.changeForwards = function(time) {	
	var now = new Date().getTime();
	if ((now - time) < 5000) {
		if (currentSong != length) {
			currentSong++;
			sendSocket(songs[currentSong]);	
		} else {
			currentSong = 0;
			sendSocket(songs[currentSong]);
		} 
	} else {
		main.setActivated(false);
	}
}
exports.changeBackwards = function(time) {
	var now = new Date().getTime();
	if ((now - time) < 5000) {
		if (currentSong != 0) {
			currentSong--;
			sendSocket(songs[currentSong]);
		} else {
			currentSong = length;
			sendSocket(songs[currentSong]);
		}
	} else {
		main.setActivated(false);
	}
}

function sendSocket(song) {
	client.connect(6000, '127.0.0.1', function() {
	  main.setChangeTime(new Date().getTime());
	  client.write(song);
	  client.destroy();
	});

	client.on('close', function() {
	  //console.log('Output is: ' + song);
	});	
}
