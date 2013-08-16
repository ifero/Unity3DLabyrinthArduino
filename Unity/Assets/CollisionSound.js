// Check if the collision is with the gameObject "muro". If is it so, set the flag hitTheWall TRUE
function OnCollisionEnter(collision:Collision){
	if (collision.gameObject.name != "Pavimento") {
			GameObject.Find("Labirinto").GetComponent("CommunicationWithArduino").hitTheWall = true;
			transform.audio.Play();
		}
}
