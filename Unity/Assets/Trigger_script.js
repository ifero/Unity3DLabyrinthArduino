function OnTriggerEnter() {
	//oggettoPalla = GameObject.Find("Palla");
	//componenteValoredado = oggettoDado.GetComponent("ValoreDado");
	//componenteValoredado.valoreCorrente = valoreFaccia;
	//Debug.Log(valoreFaccia);
	objGuiText = GameObject.Find("Testo");
	componenteTimer = objGuiText.GetComponent("Timer");
	componenteTimer.Flag=false;
}