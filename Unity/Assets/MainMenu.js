import System.IO;

var mainMenu = true;
var highScoreMenu = false;
var playMenu = false;
var scores = new Array();
var lines1 = new Array();
var lines2 = new Array();
var lines3 = new Array();
var onLevel1 = true;
var onLevel2 = false;
var onLevel3 = false;

function Start()
{
	lines1 = ReadHighScores("Assets/HighScores.txt");
	lines2 = ReadHighScores("Assets/HighScores2.txt");
	lines3 = ReadHighScores("Assets/HighScores3.txt");
	scores = lines1;
}

function OnGUI()
{
	if(mainMenu){
		if (GUI.Button(Rect(Screen.width/2 - 50,150,150,50),"Play")){
			mainMenu = false;
			playMenu = true;
		}
		if (GUI.Button(Rect(Screen.width/2 - 50,210,150,50),"High Scores")){
			mainMenu = false;
			highScoreMenu = true;
		}
		GUI.Button(Rect(Screen.width/2 - 50,270,150,50),"Tutorial");
			//Creare la scena di tutorial.
		if (GUI.Button(Rect(Screen.width/2 - 50,330,150,50),"Quit"))
			Application.Quit();
	}
	if(playMenu){
		if (GUI.Button(Rect(Screen.width/2 - 50,150,150,50),"Level 1"))
			Application.LoadLevel("Labirinto");
		if (GUI.Button(Rect(Screen.width/2 - 50,210,150,50),"Level 2"))
			Application.LoadLevel("Labirinto2");
		GUI.Button(Rect(Screen.width/2 - 50,270,150,50),"Level 3");
		if (GUI.Button(Rect(Screen.width/2 - 50,330,150,50),"Indietro")){
			playMenu = false;
			mainMenu = true;
		}
	}
	if(highScoreMenu){
		var i = 0;
		var offset = 150;
		while (i<5){
			GUI.Box(Rect(Screen.width/2 - 60,offset,170,50),scores[i]);
			i++;
			offset+=60;
		}
		if (GUI.Button(Rect(Screen.width/2 - 60,470,170,50),"Indietro")){
			highScoreMenu = false;
			mainMenu = true;
		}
		if (GUI.Button(Rect(Screen.width/2-60,530,170,50),"Reset High Scores")){
			if (onLevel1){
				File.Delete("Assets/HighScores.txt");
				File.Create("Assets/HighScores.txt");
			}
			else if (onLevel2){
				File.Delete("Assets/HighScores2.txt");
				File.Create("Assets/HighScores2.txt");
			}
			else if (onLevel3){
				File.Delete("Assets/HighScores3.txt");
				File.Create("Assets/HighScores3.txt");
			}
			for (i=0;i<5;i++){
				scores[i] = "00:00:00 Unknown";
			}
		}
		if (GUI.Button(Rect(Screen.width/2 + 180,100,120,50),"Level 1")){
			scores = lines1;
			onLevel1 = true;
			onLevel2 = false;
			onLevel3 = false;
		}
		if (GUI.Button(Rect(Screen.width/2 + 180,160,120,50),"Level 2")){
			scores = lines2;
			onLevel2 = true;
			onLevel1 = false;
			onLevel3 = false;
		}
		if (GUI.Button(Rect(Screen.width/2 + 180,220,120,50),"Level 3")){
			scores = lines3;
			onLevel3 = true;
			onLevel1 = false;
			onLevel2 = false;
		}
	}
}

function ReadHighScores(str : String) : Array
{
	var i = 0;
	var sr : StreamReader = new StreamReader(str);
	var lenght = sr.ReadToEnd();
	var temp_lines = new Array();
	sr.Close();
	lines = lenght.Split("\n"[0]);
	if(lines.length != 1 || lines[0] != ""){
		for (line in lines){
			if (line != ""){
				var temp = line.Split(" "[0]);
				temp_lines[i] = temp[1] + " " + temp[2];
				i++;
			}
		}
	}
	while(i<5){
		temp_lines[i] = "00:00:00 Unknown";
		i++;
	}
	return temp_lines;
}