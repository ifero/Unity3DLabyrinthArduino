using UnityEngine;
using System.Collections;
using System.IO.Ports;

public class CommunicationWithArduino : MonoBehaviour {
	float[] temp;
	//Windows Bonifacino
	SerialPort sp = new SerialPort("COM9",115200); 
	
	//Windows Pacino
	//SerialPort sp = new SerialPort("COM9",115200); 
	
	//Mac
	//SerialPort sp = new SerialPort("5331",115200);
	string[] accelerometer;
	
	// Use this for initialization
	void Start () {
		sp.Open();
		if(sp.IsOpen){
			try{
				string str = sp.ReadLine();
				accelerometer = str.Split(';');
				//Debug.Log(str);
				temp[0]=float.Parse(accelerometer[0]);
				temp[1]=float.Parse(accelerometer[1]);
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
	//	temp[0]=int.Parse(accelerometer[0]);
	//	temp[1]=int.Parse(accelerometer[1]);
		//sp.BaseStream.Flush();
		//Debug.Log(accelerometer[0]+" - "+accelerometer[1]+" - "+accelerometer[2]);
	}
}
