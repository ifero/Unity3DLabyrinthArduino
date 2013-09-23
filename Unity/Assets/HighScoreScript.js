import System.IO;

public var highscore : HighScores[];
public var i;
var path : String;

function Start(){
	path = System.Environment.GetFolderPath(System.Environment.SpecialFolder.MyDocuments) + "/A&ALab3D";
	highscore = new HighScores[5];
	initHighScores();
}

// Legge dal file gli highscore e li salva nella struttura apposita HighScores
function initHighScores(){
	i = 0;
	var sr : StreamReader;
	// Controlla quale file bisogna aprire, in base al livello in cui ci si trova
	switch(Application.loadedLevelName){
		case "Labirinto":
			sr = new StreamReader(path + "/HighScores.txt");
			break;
		case "Labirinto2":
			sr = new StreamReader(path + "/HighScores2.txt");
			break;
		case "Labirinto3":
			sr = new StreamReader(path + "/HighScores3.txt");
			break;
	}
	// Legge il file e salva gli highscore nella struttura
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
	// Se gli highscore sono meno di 5, aggiunge highscores vuoti
	var k = i;
	while(k<5){
		highscore[k] = new HighScores(0,"00:00:00","Unknown");
		k++;	
	}
	// chiudo lo stream in lettura
	sr.Close();
}

// algoritmo di ordinamento
private function SortIt(a : HighScores, b: HighScores) : float {
	return a.tempo.CompareTo(b.tempo);
}

function SortHighScores(){
	System.Array.Sort(highscore, SortIt);
}

// se il file è vuoto aggiunge in testa, se è pieno aggiunge in coda
function AddHighScore(hs : HighScores){
	if (highscore[0].punteggio == 0)
		highscore[0] = hs;
	else
		highscore[4] = hs;
	SortHighScores();	
}

// salva gli highscore nella struttura dentro il file permanente.
function SaveHighScores(){
	var sw : StreamWriter;
	switch(Application.loadedLevelName){
		case "Labirinto":
			sw = new StreamWriter(path + "/HighScores.txt");
			break;
		case "Labirinto2":
			sw = new StreamWriter(path + "/HighScores2.txt");
			break;
		case "Labirinto3":
			sw = new StreamWriter(path + "/HighScores3.txt");
	}
	SortHighScores();
	for (hs in highscore){
		if (hs.punteggio != 0)
			sw.WriteLine(hs.punteggio + " " + hs.tempo + " " + hs.nick);
	}
	sw.Flush();
	sw.Close();
}