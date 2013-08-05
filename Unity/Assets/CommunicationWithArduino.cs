using UnityEngine;
using System.Collections;
using System.IO.Ports;


public class CommunicationWithArduino : MonoBehaviour {
	SerialPort sp = new SerialPort("COM9",115200); 
	string[] accelerometer;
	
	// Use this for initialization
	void Start () {
		sp.Open();
		if(sp.IsOpen){
			try{
				string str = sp.ReadLine();
				accelerometer = str.Split(';');
				//Debug.Log(str);
				//sp.BaseStream.Flush();
			}
			catch(System.Exception){
				
			}
		}
		sp.ReadTimeout = 1;
	}
	
	// Update is called once per frame
	void Update () {
		if(sp.IsOpen){
			try{
				string str = sp.ReadLine();
				accelerometer = str.Split(';');
				//if (int.Parse(accelerometer[0])>45)
				//	accelerometer[0]="45";
				
				for(int i=0; i<3; i++)
				{
					if (int.Parse(accelerometer[i])>45)
						accelerometer[i]="45";
					else if (int.Parse(accelerometer[i])<-45)
						accelerometer[i]="-45";
				}
				//Debug.Log(str);
				MoveThePlane(accelerometer);
			}
			catch(System.Exception){
				
			}
		}
	}
	
	void MoveThePlane (string[] accelerometer){
		
			Quaternion target = Quaternion.Euler(-(float.Parse(accelerometer[0])),0,float.Parse(accelerometer[1]));
        	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * 2.0f);
		//	transform.Rotate(-(int.Parse(accelerometer[0])-temp[0]),0,int.Parse(accelerometer[1])-temp[1],Space.Self);
		//sp.BaseStream.Flush();
		//Debug.Log(accelerometer[0]+" - "+accelerometer[1]+" - "+accelerometer[2]);
	}
}
