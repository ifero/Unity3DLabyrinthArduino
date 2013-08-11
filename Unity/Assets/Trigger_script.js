import System.IO;

var guiEnable = false; // variable which controls GUI
var stringToEdit : String = "Player";
var textTime : String;
var floatTime : float;
var highscore : GameObject;
var objLab : GameObject;
var isHighScore = false;

function OnGUI(){
  if (guiEnable){
    // Inserisco il punteggio nel file HighScores.txt
    if (isHighScore){
		stringToEdit = GUI.TextField (Rect (10, 10, 200, 20), stringToEdit, 25);
		if(GUI.Button(Rect (220, 10, 40, 20),"OK")){
			highscore.GetComponent("HighScoreScript").AddHighScore(new HighScores(floatTime,textTime,stringToEdit));
			highscore.GetComponent("HighScoreScript").SaveHighScores();
			BackToMainMenu();
		}
	}
	else{
		
	}
	
  }
}

function OnTriggerEnter() {

	// Interrompo l'avanzamento del tempo
	objTimer = GameObject.Find("Tempo");
	componenteTimer = objTimer.GetComponent("Timer");
	componenteTimer.Flag=false;
	
	// Abilito gli elementi all'interno di OnGUI e memorizzo il punteggio
	guiEnable = true;
	floatTime = componenteTimer.guiTime;
	textTime = componenteTimer.textTime;
	
	// Interrompo la comunicazione con Arduino
	objLab = GameObject.Find("Labirinto");
	componenteArduino = objLab.GetComponent("CommunicationWithArduino");
	componenteArduino.stopcomm=true;
	
	// Controllo se il punteggio ottenuto sia nella top 5
	highscore = GameObject.Find("HighScore");
	highscore.GetComponent("HighScoreScript").SortHighScores();
	if (highscore.GetComponent("HighScoreScript").i < 5)
		isHighScore = true;
	else{
		if (highscore.GetComponent("HighScoreScript").highscore[4].punteggio > floatTime)
			isHighScore = true;
	}
	
	// Tolgo la componente fisica alla palla
	objPalla = GameObject.Find("Palla");
	Destroy(objPalla.GetComponent(Rigidbody));
	
	// Avvio il sistema particellare
	objPaSy = GameObject.Find("PaSyWin");
	objPaSy.particleSystem.startDelay=3;
	objPaSy.particleSystem.Play();
	
}

function BackToMainMenu(){
	yield WaitForSeconds(0.5);
	objLab.GetComponent("CommunicationWithArduino").stopArduino = true;
	Application.LoadLevel("Main_Menu");
}