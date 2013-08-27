function Update () {
	if (Vector3.Distance(transform.position,GameObject.Find("Pavimento").transform.position)>2){
		Destroy(this);
	}

}