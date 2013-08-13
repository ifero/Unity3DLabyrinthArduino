using UnityEngine;
using System.Collections;
using System.IO.Ports;


public class CommunicationWithArduino : MonoBehaviour {
	
	public bool stopcomm = false;
	public bool hitTheWall = false;
	public bool stopArduino = false;
	// Create a serial port to listen
	SerialPort sp = new SerialPort("COM9",115200);
	
	// Vector of strings in which will be saved the 3-axes
	string[] accelerometer;
	
	// Initialize the communication between arduino and unity
	void Start () {
		// Open the serial communication
		sp.Open();
		// Set the timeout at 100 milliseconds
		sp.ReadTimeout = 100;
		
	}
	
	// Update is called once per frame
	void Update () {
		// Check if the connection is open
		if (!stopcomm){
			if(sp.IsOpen){
				try{
					// Read a line from the serial stream (X;Y;Z)
					string str = sp.ReadLine();
					// Split the string readed by the semicolon
					accelerometer = str.Split(';');
					// Set the maximum inclination at 45 degrees
					for(int i=0; i<3; i++)
					{
						if (int.Parse(accelerometer[i])>45)
							accelerometer[i]="45";
						else if (int.Parse(accelerometer[i])<-45)
							accelerometer[i]="-45";
					}
					MoveThePlane(accelerometer,3.0f);
					if (hitTheWall){
						sp.Write("w");
						hitTheWall = false;
					}
					if(stopArduino){
						sp.Write("s");
						sp.Close();
					}
				}
				catch(System.Exception){
					
				}
			}
		}
		else{
			accelerometer[0]="0";
			accelerometer[1]="0";
			accelerometer[2]="0";
			MoveThePlane(accelerometer,0.71f);
			
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