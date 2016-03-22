var main = require('./mix-grained.js');

exports.changeLeft = function(time, first) {
	var now = new Date().getTime();
	if ((now - time) < 5000 || first) {
		main.setLED("right");
	} else {
		main.setActivated(false);
	}  	
}

exports.changeRight = function(time, first) {
	var now = new Date().getTime();
	if ((now - time) < 5000 || first) {
		main.setLED("left");
	} else {
		main.setActivated = false;
	}
}