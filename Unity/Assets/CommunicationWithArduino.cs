using UnityEngine;
using System.Collections;
using System.IO.Ports;

public class CommunicationWithArduino : MonoBehaviour {
	
	public bool stopcomm = false;
	public bool hitTheWall = false;
	public bool stopArduino = false;
	public bool isArduino = false;
	public bool useKeyboard = false;
	public bool doNotTrack = false;
	public SerialPort sp;
	
	// Vector of strings in which will be saved the 3-axes
	string[] accelerometer = {"0","0","0"};
	
	// Initialize the communication between arduino and unity
	void Start () {
		// Create a serial port to listen
		string[] ports = SerialPort.GetPortNames();
		
		if (ports.Length>0){
			sp = new SerialPort(ports[0],115200);		
			// Open the serial communication
			sp.Open();
			// Set the timeout at 100 milliseconds
			sp.ReadTimeout = 100;
			isArduino=true;
		}
		else useKeyboard = true;
	}
	
	// Update is called once per frame
	void Update () {
		// Check if the connection is open
		if(!doNotTrack){
		if (!stopcomm){
			if(isArduino&&sp.IsOpen){
				try{
					// Read a line from the serial stream (X;Y;Z)
					string str = sp.ReadLine();
					// Split the string readed by the semicolon
					accelerometer = str.Split(';');
					// Set the maximum inclination at 45 degrees
					for(int i=0; i<3; i++)
					{
						if (float.Parse(accelerometer[i])>45)
							accelerometer[i]="45";
						else if (float.Parse(accelerometer[i])<-45)
							accelerometer[i]="-45";
					}
					MoveThePlane(accelerometer,3.0f);
					if (hitTheWall){
						sp.Write("w");
						hitTheWall = false;
					}
					if((stopArduino)&&(isArduino)){
						sp.Write("s");
						sp.Close();
					}
				}
				catch(System.Exception){
					
				}
			}
			else if(useKeyboard){
				const float gradi=3f;
				float degrees=0;
				// GESTIONE TASTI	
				if(Input.GetKey(KeyCode.LeftArrow)){
					degrees=float.Parse(accelerometer[1]);
					if(degrees<43){
						degrees+=gradi;
						accelerometer[1]=degrees.ToString();
					}		
				}
				if(Input.GetKey(KeyCode.RightArrow)){
					degrees=float.Parse(accelerometer[1]);
					if(degrees>-43){
						degrees-=gradi;
						accelerometer[1]=degrees.ToString();
					}		
				}
				if(Input.GetKey(KeyCode.UpArrow)){
					degrees=float.Parse(accelerometer[0]);
					if(degrees>-43){
						degrees-=gradi;
						accelerometer[0]=degrees.ToString();
					}		
				}				
				if(Input.GetKey(KeyCode.DownArrow)){
					degrees=float.Parse(accelerometer[0]);
					if(degrees<43){
						degrees+=gradi;
						accelerometer[0]=degrees.ToString();
					}				
				}		
				MoveThePlane(accelerometer,3.0f);
			}				
		}
		else{
			useKeyboard = false;
			accelerometer[0]="0";
			accelerometer[1]="0";
			accelerometer[2]="0";
			MoveThePlane(accelerometer,0.71f);
			
		}
		}
	}
	
	// This method is callen each frame
	void MoveThePlane (string[] accelerometer, float speed){
		
			// Create a quaternion with the accelerometer values
			Quaternion target = Quaternion.Euler(-(float.Parse(accelerometer[0])),0,float.Parse(accelerometer[1]));
			// rotate the object from his position to the new position in a certain amount of time
        	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * speed);
	}
}