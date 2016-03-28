/*
*
* IMPORT LEAP MOTION
* - Entry.js must be imported.
*
*/
require('./node_modules/leapjs/template/entry.js');
var controller = new Leap.Controller();

/*
*
* IMPORT SERIAL PORT
* - The serial port initialized with the Arduino (eg. '/dev/cu.usbmodem1411' on Mac);
*
*/
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var sp = new SerialPort("/dev/cu.usbmodem1411", {
  baudrate: 9600
});

// IMPORTS
var max = require('./max.js');
var led = require('./led.js');

/*
*
* GLOBAL VARIABLES
*
*/
var first = 1; // Make sure the Leap allowed atleast one gesture.
var activated = false; // The Leap  
var handEnterTime = new Date().getTime(); // The time the hand enters the field of the Leap.
var changeTime = new Date().getTime(); // The time a value last was changed.
var lastGestureTracked = new Date().getTime(); // The time a gesture was last tracked.
var index = 0;  // The choice is determined with an index of possible outputs.

var interaction = 0; 
var interaction_timeout;
var this_ = this;

/*
*
* GESTURE CONTROLLER
*
*/
var controller = Leap.loop({enableGestures: true}, function(frame){
	
	// Look for valid gestures in the frame of sight.
	if(frame.gestures && frame.gestures.length > 0){
		// Run through the gestures
		frame.gestures.forEach(function(gesture){		       
			// The Leap Motion puts out a type - here a swipe gesture.
			switch (gesture.type){
			    case "swipe":
			        // Don't do anything if the direction is undefined
			        if (typeof frame.gestures[0].direction !== 'undefined' && activated) {
				        // Swipe Direction: Right
				        if (frame.gestures[0].direction[0] > 0){
					        // Avoid catching too many gestures on top of each other.
					        if ((new Date().getTime() - lastGestureTracked) > 400 && (new Date().getTime() - handEnterTime) > 100) {	
								console.log("Swipe Gesture Right");
					        	if (interaction == 1) {
					        		led.changeRight(changeTime, first);
					        	} else if (interaction == 2) {
					        		max.changeForwards(changeTime);
					        	}					        						     
							}
						// Swipe Direction: Left - The same as above just left-going direction. 	
						} else {
							if ((new Date().getTime() - lastGestureTracked) > 400 && (new Date().getTime() - handEnterTime) > 100) {	
								console.log("Swipe Gesture Left");			
								if (interaction == 1) { 
									led.changeLeft(changeTime, first);
								} else if (interaction == 2) {
									max.changeBackwards(changeTime); 	
								} 	
							}			
						}
						lastGestureTracked = new Date().getTime();
					}	                                    
			}      
		});		    	
	}	
});	

/*
*
* SERIAL PORT LISTENER
* - everything received is in a buffer format and should be converted.
*
*/
sp.on('data', function(data) {
	console.log(data.toString('utf8'));
	var value = data.toString('utf8');

	if (value == 'A') {
    	this_.clear();
    	activated = true;
    	changeTime = new Date().getTime();	
    	interaction++;
    	if (interaction == 3) {
    		interaction = 1;
    	}

    	if (interaction == 1) {
    		sp.write('LIGHTS' + '\n');
    		this_.startTimeout();
    	}
    	if (interaction == 2) {
    		sp.write('MUSIC' + '\n');
    	}	
    	console.log("Activated set with interaction " + interaction);
	}
});

/*
*
* LED CONTROLLER
* - tell the Arduino which color to turn on. 
*
*/
exports.setLED = function(direction) {

	if (direction == "right") {
		if (first == 1) {
			index = -1;
			first = 0;
		}
		index++;
	} else if (direction == "left") {
		if (first == 1) {
			index = 1;
			first = 0;
		}
		index--;
	}

	if (index == -1) {
		index = 2;
	} 

	if (index == 3) {
		index = 0;
	}

	console.log("Index is " + index);

	if (index == 0) {
		// RED LED ON
		sp.write('RED' + '\n');
		changeTime = new Date().getTime();
	} 	else if (index == 1) {
		// BLUE LED ON
		sp.write('BLUE' + '\n');
		changeTime = new Date().getTime();
	} else if (index == 2) {
		// GREEN LED ON
		sp.write('GREEN' + '\n');
		changeTime = new Date().getTime();
	}
	this_.clear();
	this_.startTimeout();
}

exports.setActivated = function(state) {
	activated = state;
	interaction = 0;
}

exports.setChangeTime = function(time) {
	changeTime = time;
}

exports.startTimeout = function() {
	interaction_timeout = setTimeout(function() {
		activated = false;
		sp.write('NOTHING' + '\n');
	}, 5000);
}

exports.clear = function() {
	clearTimeout(interaction_timeout);
} 

/*
*
* LEAP SETUP
*
*/
controller.on('ready', function() {
	    console.log("ready");
});
controller.on('connect', function() {
    console.log("connect");
});
controller.on('disconnect', function() {
    console.log("disconnect");
});
controller.on('focus', function() {
    console.log("focus");
});
controller.on('blur', function() {
    console.log("blur");
});
controller.on('deviceConnected', function() {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
    console.log("deviceDisconnected");
});

//Initiate Stuff
controller.connect();


