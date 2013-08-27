#include <Wire.h>

#define LIS302_POWER_PIN 13
#define LIS302_INT2_PIN 2
#define BUZZER_PIN 9

#define I2C_ADDRESS 28
#define POWER_UP_DELAY 10
#define REGISTER_WHO_AM_I 0x0F
#define WHO_AM_I_RESULT 0x3B
#define CTRL_REG1 0x20
#define CTRL_XEN 0
#define CTRL_YEN 1
#define CTRL_ZEN 2
#define CTRL_STM 3
#define CTRL_STP 4
#define CTRL_FS 5
#define CTRL_PD 6
#define CTRL_DR 7

#define X_OUT 0x29
#define Y_OUT 0x2b
#define Z_OUT 0x2d

void setup()
{  
  Serial.begin(115200);  // start serial for output
  pinMode(BUZZER_PIN, OUTPUT); // set the pin for the Piezo
  setupLIS();
  startLIS();
}

void loop()
{
  Serial.flush(); // Empty the memory each time in the loop
  char x = readRegister(X_OUT);
  char y = readRegister(Y_OUT);
  char z = readRegister(Z_OUT);
  
  char xmap = map(x, 56, -52, 90, -90);
  char ymap = map(y, 54, -57, 90, -90);
  Serial.print(xmap, DEC);
  Serial.print(";");
  Serial.print(ymap, DEC);
  Serial.print(";");
  Serial.print(z, DEC);
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


void setupLIS() {
  
  pinMode(LIS302_POWER_PIN, OUTPUT); //the power pin
  
  digitalWrite(LIS302_POWER_PIN,LOW); //switch off the LIS302
  
  Wire.begin();        // join i2c bus (address optional for master)
  
}

void startLIS() {
  
  digitalWrite(LIS302_POWER_PIN,HIGH); //switch on the LIS302

  delay(POWER_UP_DELAY);
  writeRegister(CTRL_REG1 , _BV(CTRL_PD) | _BV(CTRL_XEN) | _BV(CTRL_YEN) | _BV(CTRL_ZEN));
}

void writeRegister(unsigned char r, unsigned char v)
{
  Wire.beginTransmission(I2C_ADDRESS);
  Wire.write(r);
  Wire.write(v);
  Wire.endTransmission();
}

unsigned char readRegister(unsigned char r)
{
  unsigned char v;
  Wire.beginTransmission(I2C_ADDRESS);
  Wire.write(r);  // register to read
  Wire.endTransmission();

  Wire.requestFrom(I2C_ADDRESS, 1); // read a byte
  while(!Wire.available()) {
    // waiting
  }
  v = Wire.read();
  return v;
}
