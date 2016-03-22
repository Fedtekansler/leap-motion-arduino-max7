var net = require('net');

// this client only sends
var client = new net.Socket();

exports.sendSocket = function(song) {
	client.connect(6000, '127.0.0.1', function() {
	  client.write(song);
	  client.destroy();
	});

	client.on('close', function() {
	  console.log('Output is: ' + song);
	});	
}