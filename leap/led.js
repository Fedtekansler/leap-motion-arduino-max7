var main = require('./mix-grained.js');

exports.changeLeft = function(time, first) {
	main.setLED("left"); 	
}

exports.changeRight = function(time, first) {
	main.setLED("right");
}