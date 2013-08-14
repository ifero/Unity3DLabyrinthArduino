import System.IO;

var mainMenu = true;
var highScoreMenu = false;

function OnGUI()
{
	if(mainMenu){
		if (GUI.Button(Rect(Screen.width/2 - 50,150,150,50),"Play"))
			Application.LoadLevel("Labirinto");
		if (GUI.Button(Rect(Screen.width/2 - 50,210,150,50),"High Scores")){
			mainMenu = false;
			highScoreMenu = true;
		}
		GUI.Button(Rect(Screen.width/2 - 50,270,150,50),"Tutorial");
		if (GUI.Button(Rect(Screen.width/2 - 50,330,150,50),"Quit"))
			Application.Quit();
	}
	if(highScoreMenu){
		var sr : StreamReader = new StreamReader("Assets/HighScores.txt");
		var i = 0;
		var offset = 150;
		var lenght = sr.ReadToEnd();
		lines = lenght.Split("\n"[0]);
		if(lines.length != 1 || lines[0] != ""){
			for (line in lines){
				if (line != ""){
					var temp = line.Split(" "[0]);
					GUI.Box(Rect(Screen.width/2 - 60,offset,170,50),temp[1] + " " + temp[2]);
					i++;
					offset+=60;
				}
			}
		}
		while(i<5){
			GUI.Box(Rect(Screen.width/2 - 60,offset,170,50),"00:00:00 unknown");
			i++;
			offset+=60;	
		}

		if (GUI.Button(Rect(Screen.width/2 - 60,470,70,50),"Indietro"))
		{	Application.LoadLevel("Main_Menu");		}
		if (GUI.Button(Rect(Screen.width/2+40,470,70,50),"Quit"))
		{	Application.Quit();						}

		if (GUI.Button(Rect(Screen.width/2+150,170,150,50),"Reset High Scores")){
			//File.Delete("Assets/HighScores.txt");
			//File.Create("Assets/HighScores.txt");
			//var sw : StreamWriter = new StreamWriter("Assets/HighScores.txt");
			//sw.Close();
			objhs = GameObject.Find("HighScores");
			objhs.GetComponent("HighScoreScript").ResetHighScorse();
			Application.LoadLevel("Main_Menu");
		}
		if (GUI.Button(Rect(Screen.width/2+150,230,150,50),"Main Menu")){
			highScoreMenu = false;
			mainMenu = true;
		}

	}
}
