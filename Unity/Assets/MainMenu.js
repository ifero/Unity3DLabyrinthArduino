
function OnGUI()
{
	if (GUI.Button(Rect(Screen.width/2 - 50,150,150,50),"Play"))
		Application.LoadLevel("Labirinto");
	GUI.Button(Rect(Screen.width/2 - 50,210,150,50),"High Scores");
	GUI.Button(Rect(Screen.width/2 - 50,270,150,50),"Tutorial");
	if (GUI.Button(Rect(Screen.width/2 - 50,330,150,50),"Quit"))
		Application.Quit();
}
