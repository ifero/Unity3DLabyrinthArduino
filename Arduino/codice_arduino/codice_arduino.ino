#include <Wire.h>

#define LIS302_POWER_PIN 13
#define LIS302_INT2_PIN 2

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
  setupLIS();
  startLIS();
}

void loop()
{
  Serial.flush(); // Empty the memory each time in the loop
  char x = readRegister(X_OUT);
  char y = readRegister(Y_OUT);
  char z = readRegister(Z_OUT);
  
  //char xmap = map(x,60,-60,90,-90);
  //char ymap = map(y,60,-60,90,-90);
  //char zmap = map(z,60,-60,90,-90);
  Serial.print(x,DEC);
  Serial.print(";");
  Serial.print(y,DEC);
  Serial.print(";");
  Serial.print(z,DEC);
  Serial.println(";");

  delay(33);
}

void setupLIS() {
  
  Serial.println("Setting up LIS302DL");
  
  pinMode(LIS302_POWER_PIN, OUTPUT); //the power pin
  pinMode(LIS302_INT2_PIN, INPUT); //the int2 pin
  
  digitalWrite(LIS302_POWER_PIN,LOW); //switch off the LIS302
  
  Wire.begin();        // join i2c bus (address optional for master)
  
}

void startLIS() {
  
  Serial.println("Powering up LIS302DL");
  digitalWrite(LIS302_POWER_PIN,HIGH); //switch off the LIS302

  delay(POWER_UP_DELAY);
  writeRegister(CTRL_REG1 , _BV(CTRL_PD) | _BV(CTRL_XEN) | _BV(CTRL_YEN) | _BV(CTRL_ZEN));
  
  //read who am i
  char myself = readRegister(REGISTER_WHO_AM_I);
  if (myself == WHO_AM_I_RESULT) {
    Serial.println("yippie got an lis302DL!");
  } else {
    Serial.print("found an ");
    Serial.print(myself, HEX);
    Serial.println("! very strange!");
  }
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
