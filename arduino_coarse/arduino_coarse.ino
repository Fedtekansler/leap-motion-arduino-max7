int fsrAnalogPin = 0; // FSR is connected to analog 0
int fsrReading;      // the analog reading from the FSR resistor divider

int fsrAnalogPin2 = 1; // FSR is connected to analog 0
int fsrReading2;      // the analog reading from the FSR resistor divider

int fsrAnalogPin3 = 2; // FSR is connected to analog 0
int fsrReading3;      // the analog reading from the FSR resistor divider

int fsrAnalogPin4 = 3; // FSR is connected to analog 0
int fsrReading4;      // the analog reading from the FSR resistor divider

String input; 
const int first = 140;
const int second = 200;
const int third = 390;
 
void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600); 
}
 
void loop(void) {
  // ZONE 1
  fsrReading = analogRead(fsrAnalogPin);
  if (fsrReading > first && fsrReading < second) {
    Serial.print(1);
    Serial.println("");
  } else if (fsrReading > second && fsrReading < third) {
    Serial.print(2);
    Serial.println("");    
  } else if (fsrReading > third) {
    Serial.print(3);
    Serial.println("");    
  }
  
  // ZONE 2
  fsrReading2 = analogRead(fsrAnalogPin2);
  if (fsrReading2 > first && fsrReading2 < second) {
    Serial.print(4);
    Serial.println("");    
  } else if (fsrReading2 > second && fsrReading2 < third) {
    Serial.print(5);
    Serial.println("");    
  } else if (fsrReading2 > third) {
    Serial.print(6);
    Serial.println("");    
  }
  
  // ZONE 3
  fsrReading3 = analogRead(fsrAnalogPin3);
  if (fsrReading3 > first && fsrReading3 < second) {
    Serial.print(7);
    Serial.println("");    
  } else if (fsrReading3 > second && fsrReading3 < third) {
    Serial.print(8);
    Serial.println("");    
  } else if (fsrReading3 > third) {
    Serial.print(9);
    Serial.println("");    
  }
  
  // ZONE 4
  fsrReading4 = analogRead(fsrAnalogPin4);
  if (fsrReading4 > first && fsrReading4 < second) {
    Serial.print(10);
    Serial.println("");    
  } else if (fsrReading4 > second && fsrReading4 < third) {
    Serial.print(11);
    Serial.println("");    
  } else if (fsrReading4 > third) {
    Serial.print(12);
    Serial.println("");    
  }
  
  delay(1000);
} 

