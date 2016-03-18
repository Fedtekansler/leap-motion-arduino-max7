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

/*
*
* GLOBAL VARIABLES
*
*/

var first = 1; // Make sure the Leap allowed atleast one gesture.
var activated = false; // The Leap  
var handEnterTime = new Date().getTime(); // The time the hand enters the field of the Leap.
var ledChangeTime = new Date().getTime(); // The time the LED last changed.
var lastGestureTracked = new Date().getTime(); // The time a gesture was last tracked.
var index = 0;  // The choice is determined with an index of possible outputs.

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
								// Allow the gesture to activate LED if first time or under 5 seconds since last gesture.
								var now = new Date().getTime(); 
								if ((now - ledChangeTime) < 5000 || first) {
								    console.log("Swipe Gesture Right");
									setLED("right");
								} else {
									activated = false;
								}  
							}
						// Swipe Direction: Left - The as above just left-going direction. 	
						} else {
							if ((new Date().getTime() - lastGestureTracked) > 400 && (new Date().getTime() - handEnterTime) > 100) {	
								var now = new Date().getTime();
								if ((now - ledChangeTime) < 5000 || first) {
									console.log("Swipe Gesture Left");
									setLED("left");
								} else {
									activated = false;
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
		console.log("Activated set");
    	activated = true;
    	ledChangeTime = new Date().getTime();		
	}
});

/*
*
* LED CONTROLLER
* - tell the Arduino which color to turn on. 
*
*/
function setLED(direction) {

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
		ledChangeTime = new Date().getTime();
	} 	else if (index == 1) {
		// BLUE LED ON
		sp.write('BLUE' + '\n');
		ledChangeTime = new Date().getTime();
	} else if (index == 2) {
		// GREEN LED ON
		sp.write('GREEN' + '\n');
		ledChangeTime = new Date().getTime();
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


