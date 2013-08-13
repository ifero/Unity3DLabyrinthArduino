function OnGUI()
{
/*	if (GUI.Button(Rect(Screen.width - 200,50,150,50),"Pause")){	
		// Interrompo l'avanzamento del tempo
		objTimer = GameObject.Find("Tempo");
		componenteTimer = objTimer.GetComponent("Timer");
		componenteTimer.Flag=false;
		
		// Interrompo la comunicazione con Arduino
		objLab = GameObject.Find("Labirinto");
		componenteArduino = objLab.GetComponent("CommunicationWithArduino");
		componenteArduino.stopcomm=true;
		if (GUI.Button(Rect(Screen.width - 200,50,150,50),"Play")	{
			// Riavvio l'avanzamento del tempo
			objTimer = GameObject.Find("Tempo");
			componenteTimer = objTimer.GetComponent("Timer");
			componenteTimer.Flag=true;
			
			// Riavvio la comunicazione con Arduino
			objLab = GameObject.Find("Labirinto");
			componenteArduino = objLab.GetComponent("CommunicationWithArduino");
			componenteArduino.stopcomm=false;
		}
	}*/
	if (GUI.Button(Rect(Screen.width - 200,50,150,50),"Pause")){
		Debug.Log("Pausizzatiiiiiiiii!!!!");
	}
	if (GUI.Button(Rect(Screen.width - 200,120,150,50),"Restart")){	
		Application.LoadLevel("Labirinto");
	}
	if (GUI.Button(Rect(Screen.width-200,190,150,50),"Quit")){
		Application.LoadLevel("Main_Menu");
	}
}