#include <SoftwareSerial.h>
#include <Servo.h>


SoftwareSerial mySerial(6, 7); 

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
int led = 8;
String temp;
String server_respond;
String reader;
String tag;
int i=0;

void setup()  {
  Serial.begin(57600);
  mySerial.begin(19200);//begin mySerial at 19200(standard baudrate for the SM130
  myservo.attach(9);  // Configure le moteur
  pinMode(led, OUTPUT); // Configure la broche 8 de la carte arduino en sortie
  digitalWrite(led, HIGH);
}

void loop() {

  mySerial.print((char)0xFF); //first byte for indicating a new frame
  mySerial.print((char)0x00); //a reserved byte for future use; it always has to be 0x00
  mySerial.print((char)0x01); //the length of the frame
  mySerial.print((char)0x82); //the real command: seek for tags
  mySerial.println((char)0x83); //CSUM byte

  delay(500); //a small delay is needed for giving the rfidreader time

  while (mySerial.available() > 0) {
    temp=String(mySerial.read(), HEX);
    reader=reader+temp; //compile the answer of the rfidreader
  }
  if(reader!="ff02824cd0"){//ff02824cd0 is the answer if no tag is found
    tag=reader.substring(17,25); //distract the tagid from the answer
  }

  Serial.println(tag); // and send it to serial port
  server_respond= Serial.readString();
  if(server_respond=="true"){
     myservo.write(180);
     digitalWrite(led, LOW);
     delay(2000);
     digitalWrite(led, HIGH);
     myservo.write(0);
  }
  reader="";
  Serial.flush();

}
