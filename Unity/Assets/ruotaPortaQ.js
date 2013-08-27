public var degrees : float = 90.0;
public var velocity : float = 2.0;
public var rotateOnStart : boolean = true;
public var delay : float = 4; 
//private var leftRight : boolean;
private var timer;
private var onDelay : boolean=false;
private var angle : float;
private var scambia : float=0;

function Start(){
	if (!rotateOnStart){
		timer=Time.time+delay;
		onDelay=true;
	}
	angle=transform.localRotation.eulerAngles.y; // angolo di rotazione iniziale dell'asse y
}

function Update () {
	if(!onDelay){			
		var target = Quaternion.Euler(0,degrees,0); 
		transform.localRotation = Quaternion.Slerp(transform.localRotation, target, Time.deltaTime * velocity);
		
		if (Mathf.Abs(transform.localRotation.eulerAngles.y-angle)<0.0001){
			//Debug.Log("!onDelay Nell'if");
			var app=degrees;
			degrees=scambia;
			scambia=app;
			timer=Time.time+delay;
			onDelay=true;
			//Debug.Log("RotazioneAttuale: "+transform.localRotation.eulerAngles.y+"	ANGOLO: "+angle+"	GRADI: "+degrees);
		}
		else{
			angle=transform.localRotation.eulerAngles.y;
			//Debug.Log(transform.localRotation.eulerAngles.y+" "+angle);
		}
	}
	else
	{
		//Debug.Log("OnDelay - "+Time.time+" "+timer);
		if(Time.time>=timer)
			onDelay=false;
	}
}
