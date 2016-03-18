/* FSR simple testing sketch. 
 
Connect one end of FSR to power, the other end to Analog 0.
Then connect one end of a 10K resistor from Analog 0 to ground 
 
For more information see www.ladyada.net/learn/sensors/fsr.html */
 
int fsrPin = 0;     // the FSR and 10K pulldown are connected to a0
int fsrReading;     // the analog reading from the FSR resistor divider
int redPin = 11;
int greenPin = 10;
int bluePin = 9;

String input; 
 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600); 
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);     
}
 
void loop(void) {
  fsrReading = analogRead(fsrPin);  
 
  if (fsrReading > 800) {
    Serial.print('A');
  } 
  
  if (Serial.available() > 0) {
      input = Serial.readStringUntil('\n');
      if (input == "RED") {
        setColor(255, 0, 0); 
      } else if (input == "BLUE") {
        setColor(0, 0, 255);
      } else if (input == "GREEN") {
        setColor(0, 255, 0);
      }
  }
  delay(1000);
} 

void setColor(int red, int green, int blue) {
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);  
}
