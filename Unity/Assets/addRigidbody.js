function OnCollisionEnter (collision: Collision){
	if (collision.gameObject.name == "Palla")
		gameObject.AddComponent(Rigidbody);
}