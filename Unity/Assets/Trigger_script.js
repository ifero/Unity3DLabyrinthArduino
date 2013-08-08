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
	//PallaTransf=objPalla.GetComponent(Transform);
	//PallaTransf.transform.Translate(transform.transform.position+PallaTransf.transform.position);
	//PallaTransf.transform.position=Vector3(-0.4202693,(0.5079651*2),-0.3796388);
	
	// Avvio PaSyWin
	objPaSy = GameObject.Find("PaSyWin");
	objPaSy.particleSystem.startDelay=3;
	objPaSy.particleSystem.Play();
	
	
}