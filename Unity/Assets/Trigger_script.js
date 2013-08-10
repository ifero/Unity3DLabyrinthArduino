import System.IO;

var guiEnable = false; // variable which controls GUI
var stringToEdit : String = "Player";
var highscore : String[];
var textTime : String;
var floatTime : float;
var minFive = false;

function OnGUI(){
  if (guiEnable){
    // Inserisco il punteggio nel file HighScores.txt
	stringToEdit = GUI.TextField (Rect (10, 10, 200, 20), stringToEdit, 25);
	if(GUI.Button(Rect (220, 10, 40, 20),"OK")){
		if (minFive){
			var sw : StreamWriter = new StreamWriter("Assets/HighScores.txt");
			for (line in highscore){
				
				sw.Write(line);
				
			}
			sw.Write(floatTime + " ");
			sw.Write(textTime + " ");
			sw.WriteLine(stringToEdit);
			sw.Flush();
			sw.Close();
		}
		BackToMainMenu();
	}
	
  }
}

function OnTriggerEnter() {

	// Interrompo l'avanzamento del tempo
	objTimer = GameObject.Find("Tempo");
	componenteTimer = objTimer.GetComponent("Timer");
	componenteTimer.Flag=false;
	
	// Ricevo i punteggi massimi e stabilisco se sia nella top 5
	//
	
	// Interrompo la comunicazione con Arduino
	objLab = GameObject.Find("Labirinto");
	componenteArduino = objLab.GetComponent("CommunicationWithArduino");
	componenteArduino.stopcomm=true;	
	
	// Leggo gli high scores per vedere se si trova nella top 5
	var sr : StreamReader = new StreamReader("Assets/HighScores.txt");
	var lenght = sr.ReadToEnd();
	highscore = lenght.Split("\n"[3]);
	Debug.Log(highscore.length);
	if (highscore.length < 5){
		guiEnable = true;
		minFive = true;
	}
	sr.Close();
	// Attivo la OnGUI e setto textTime.
	//guiEnable = true;
	floatTime = componenteTimer.guiTime;
	textTime = componenteTimer.textTime;
	
	// Tolgo la componente fisica alla palla
	objPalla = GameObject.Find("Palla");
	Destroy(objPalla.GetComponent(Rigidbody));
	//PallaTransf=objPalla.GetComponent(Transform);
	//PallaTransf.transform.Translate(transform.transform.position+PallaTransf.transform.position);
	//PallaTransf.transform.position=Vector3(-0.4202693,(0.5079651*2),-0.3796388);
	
	// Avvio PaSyWin
	objPaSy = GameObject.Find("PaSyWin");
	objPaSy.particleSystem.startDelay=3;
	objPaSy.particleSystem.Play();
	
	

	
}

function BackToMainMenu(){
	yield WaitForSeconds(0.5);
	Application.LoadLevel("Main_Menu");
}