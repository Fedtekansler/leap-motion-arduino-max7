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
var sp = new SerialPort("/dev/cu.usbmodem1421", {
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
var handEnterTime = new Date().getTime(); // The time the hand enters the field of the Leap.
var lastGestureTracked = new Date().getTime(); // The time a gesture was last tracked.
var index = 0;  // The choice is determined with an index of possible outputs.

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
			        if (typeof frame.gestures[0].direction !== 'undefined') {
				        // Swipe Direction: Right
				        if (frame.gestures[0].direction[0] > 0){
					        // Avoid catching too many gestures on top of each other.
					        if ((new Date().getTime() - lastGestureTracked) > 400 && (new Date().getTime() - handEnterTime) > 100) {	
								console.log("Swipe Gesture Right");
					        	led.changeRight(changeTime, first);
					        	max.changeForwards(changeTime);					        						     
							}
						// Swipe Direction: Left - The same as above just left-going direction. 	
						} else {
							if ((new Date().getTime() - lastGestureTracked) > 400 && (new Date().getTime() - handEnterTime) > 100) {	
								console.log("Swipe Gesture Left");			
								led.changeLeft(changeTime, first);
								max.changeBackwards(changeTime); 		
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
var zone;
var counter = 1;
sp.on('data', function(data) {
	console.log(data.toString('utf8'));
	var value = data.toString('utf8');
	if (counter == 2) {
		max.playTune(zone, value);
		counter = 1;
	} else {
		zone = value;
		counter++;
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
	} 	else if (index == 1) {
		// BLUE LED ON
		sp.write('BLUE' + '\n');
	} else if (index == 2) {
		// GREEN LED ON
		sp.write('GREEN' + '\n');
	}
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


