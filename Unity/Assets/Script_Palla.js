private var pos;
private var rot;
public var esplosione : GameObject;
private var posPalla;
//public var esplosioneSuono : AudioClip;
//private var clipOriginale : AudioClip;

function Start() {
	pos = transform.localPosition;
	rot = transform.localRotation;
}
function Update() {
	if (transform.localPosition.y < -2) {
		transform.parent = null;
		posPalla = transform.position;
		//clipOriginale = audio.clip;
		//audio.clip = esplosioneSuono;
		//audio.Play();
		RestartPalla();
	}	
}

function RestartPalla(){
	yield WaitForSeconds(0.2);
	this.renderer.enabled = false;
	var instEsplosione : GameObject = Instantiate(esplosione,transform.position,transform.rotation);
	transform.parent = GameObject.Find("Labirinto").transform;
	transform.localPosition = pos;
	GameObject.Find("Tempo").GetComponent("Timer").startTime = Time.time;
	transform.rigidbody.velocity = Vector3(0,0,0);
	//audio.clip = clipOriginale;
	this.renderer.enabled = true;
}