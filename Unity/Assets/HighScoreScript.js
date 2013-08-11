import System.IO;

public var highscore : HighScores[];
public var i;

function Start(){
	highscore = new HighScores[5];
	initHighScores();
}

function initHighScores(){
	i = 0;
	var sr : StreamReader = new StreamReader("Assets/HighScores.txt");
	var lenght = sr.ReadToEnd();
	lines = lenght.Split("\n"[0]);
	if(lines.length != 1 || lines[0] != ""){
		for (line in lines){
			if (line != ""){
				var temp = line.Split(" "[0]);
				highscore[i] = new HighScores(parseFloat(temp[0]),temp[1],temp[2]);
				i++;
			}
		}
	}
	var k = i;
	while(k<5){
		highscore[k] = new HighScores(0,"00:00:00","unknown");
		k++;	
	}
//	SortHighScores();
//	for(hs in highscore){
//		Debug.Log(hs.punteggio + " " + hs.tempo + " " + hs.nick);
//	}
	
	sr.Close();
}

private function SortIt(a : HighScores, b: HighScores) : int {
	return a.punteggio - b.punteggio;
}

function SortHighScores(){
	System.Array.Sort(highscore, SortIt);
}


function AddHighScore(hs : HighScores){
	if (highscore[0].punteggio == 0)
		highscore[0] = hs;
	else
		highscore[4] = hs;
}

function SaveHighScores(){
	var sw : StreamWriter = new StreamWriter("Assets/HighScores.txt");
	SortHighScores();
	for (hs in highscore){
		if (hs.punteggio != 0)
			sw.WriteLine(hs.punteggio + " " + hs.tempo + " " + hs.nick);
	}
	sw.Flush();
	sw.Close();
}
