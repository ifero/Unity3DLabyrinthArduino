var connection : GameObject;
var textPause;
var paused = false;
function Start()
{
	textPause = "Pause";
	Time.timeScale = 1;
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
			switch(Application.loadedLevelName){
				case "Labirinto":
					Application.LoadLevel("Labirinto");
					break;
				case "Labirinto2":
					Application.LoadLevel("Labirinto2");
					break;
				case "Labirinto3":
					Application.LoadLevel("Labirinto3");
					break;
			}
		}
		if (GUI.Button(Rect(Screen.width-200,190,150,50),"Quit")){
			paused = false;
			Application.LoadLevel("Main_Menu");
		}
	}
}