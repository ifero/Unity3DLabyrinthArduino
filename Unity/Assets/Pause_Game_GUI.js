var connection : GameObject;
var textPause;
var paused = false;
function Start()
{
	textPause = "Pause";
	connection = GameObject.Find("Labirinto");
}

function OnGUI()
{
	if (GUI.Button(Rect(Screen.width - 200,50,150,50),textPause)){
		if (textPause.CompareTo("Pause")==0){
			paused = true;
			textPause = "Resume";
			Time.timeScale = 0;
			connection.GetComponent("CommunicationWithArduino").doNotTrack = true;
		}
		else{
			paused = false;
			textPause = "Pause";
			Time.timeScale = 1;
			connection.GetComponent("CommunicationWithArduino").doNotTrack = false;
		}
			
	}
	if (paused){
		if (GUI.Button(Rect(Screen.width - 200,120,150,50),"Restart")){	
			Application.LoadLevel("Labirinto");
		}
		if (GUI.Button(Rect(Screen.width-200,190,150,50),"Quit")){
			Application.LoadLevel("Main_Menu");
		}
	}
}