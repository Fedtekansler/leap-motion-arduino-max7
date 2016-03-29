int fsrAnalogPin = 0; // FSR is connected to analog 0
int fsrReading;      // the analog reading from the FSR resistor divider

int fsrAnalogPin2 = 1; // FSR is connected to analog 0
int fsrReading2;      // the analog reading from the FSR resistor divider

int fsrAnalogPin3 = 2; // FSR is connected to analog 0
int fsrReading3;      // the analog reading from the FSR resistor divider

int fsrAnalogPin4 = 3; // FSR is connected to analog 0
int fsrReading4;      // the analog reading from the FSR resistor divider

int myPins[] = {1, 2, 3, 4, 5, 6, 7, 8};

String input; 
const int first = 50;
const int second = 500;
 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600); 
  for (int pin = 1; pin < 5; pin++) {
    pinMode(pin, OUTPUT);
  } 
}
 
void loop(void) {
  // ZONE 1
  fsrReading = analogRead(fsrAnalogPin);
  if (fsrReading > first && fsrReading < second) {
    Serial.print(1);
  } else if (fsrReading > second) {
    Serial.print(2);
  }
  
  // ZONE 2
  fsrReading2 = analogRead(fsrAnalogPin2);
  if (fsrReading2 > first && fsrReading2 < second) {
    Serial.print(3);
  } else if (fsrReading2 > second) {
    Serial.print(4);
  }
  
  // ZONE 3
  fsrReading3 = analogRead(fsrAnalogPin3);
  if (fsrReading3 > first && fsrReading3 < second) {
    Serial.print(5);
  } else if (fsrReading3 > second) {
    Serial.print(6);
  }
  
  // ZONE 4
  fsrReading4 = analogRead(fsrAnalogPin4);
  if (fsrReading4 > first && fsrReading4 < second) {
    Serial.print(7);
  } else if (fsrReading4 > second) {
    Serial.print(8);
  }
  
  delay(1000);
} 

