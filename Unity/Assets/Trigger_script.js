var intero : int;

function OnTriggerEnter() {
	//intero=1;	
	// Interrompo l'avanzamento del tempo
	objTimer = GameObject.Find("Testo");
	componenteTimer = objTimer.GetComponent("Timer");
	componenteTimer.Flag=false;
	
	// Interrompo la comunicazione con Arduino
	objLab = GameObject.Find("Labirinto");
	componenteArduino = objLab.GetComponent("CommunicationWithArduino");
	componenteArduino.stopcomm=true;	
	
	// Tolgo la componente fisica alla palla
	objPalla = GameObject.Find("Palla");
	Destroy(objPalla.GetComponent(Rigidbody));
	
	// Avvio PaSyWin
	objPaSy = GameObject.Find("PaSyWin");
	objPaSy.particleSystem.startDelay=3;
	objPaSy.particleSystem.Play();
	
	
}