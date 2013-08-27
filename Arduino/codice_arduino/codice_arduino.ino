int XPin = A0; // X
int YPin = A1; // Y
int ZPin = A2; // Z
#define BUZZER_PIN 9
 
void setup() {
  Serial.begin(115200);
  pinMode(BUZZER_PIN, OUTPUT); // set the pin for the Piezo
} 
 
void loop() {
  Serial.flush(); // Empty the memory each time in the loop
  float xmap = fmap(analogRead(XPin), 170, 495, -90, 90);
  float ymap = fmap(analogRead(YPin), 180, 510, 90, -90);
  Serial.print(xmap, DEC);
  Serial.print(";");
  Serial.print(ymap, DEC);
  Serial.print(";");
  Serial.print(analogRead(ZPin), DEC);
  Serial.println(";");
  delay(33);
  
  if(Serial.available() >0 ){
    char val = Serial.read();
    if(val == 'w'){
      digitalWrite(BUZZER_PIN, HIGH);
      delayMicroseconds(54);
      digitalWrite(BUZZER_PIN, LOW);
      delayMicroseconds(54);
    }
  }
}

float fmap(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
