import System.IO;

public var highscore : HighScores[];

function Start(){
	highscore = new HighScores[5];
	initHighScores();
}

function initHighScores(){
	var i = 0;
	var sr : StreamReader = new StreamReader("Assets/HighScores.txt");
	var lenght = sr.ReadToEnd();
	lines = lenght.Split("\n"[0]);
	if (!lines[0] == ""){
		for (line in lines){
			var temp = line.Split(" "[0]);
			highscore[i] = new HighScores(parseFloat(temp[0]),temp[1],temp[2]);
			i++;
		}
	}
	while(i<5){
		highscore[i] = new HighScores(0,"00:00:00","unknown");
		i++;	
	}
	for(hs in highscore){
		Debug.Log(hs.punteggio + " " + hs.tempo + " " + hs.nick);
	}
	
	sr.Close();
}
