import System.IO;

var mainMenu = true;
var highScoreMenu = false;
var scores = new Array();
var lines = new Array();

function Start()
{
	lines = ReadHighScores();
}

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
			//Creare la scena di tutorial.
		if (GUI.Button(Rect(Screen.width/2 - 50,330,150,50),"Quit"))
			Application.Quit();
	}
	if(highScoreMenu){
		var i = 0;
		var offset = 150;
		lines = ReadHighScores();
		if(lines.length != 1 || lines[0] != ""){
			for (line in lines){
				if (line != ""){
					var temp = line.Split(" "[0]);
					scores[i] = temp[1] + " " + temp[2];
					GUI.Box(Rect(Screen.width/2 - 60,offset,170,50),scores[i]);
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

		if (GUI.Button(Rect(Screen.width/2 - 60,470,170,50),"Indietro")){
			highScoreMenu = false;
			mainMenu = true;
		}
		if (GUI.Button(Rect(Screen.width/2-60,530,170,50),"Reset High Scores")){
			File.Delete("Assets/HighScores.txt");
			File.Create("Assets/HighScores.txt");
			for (i=0;i<5;i++){
				scores[i] = "00:00:00 unknown";
			}
		}
	}
}

function ReadHighScores() : String[]
{
	var sr : StreamReader = new StreamReader("Assets/HighScores.txt");
	var lenght = sr.ReadToEnd();
	sr.Close();
	return lenght.Split("\n"[0]);
}