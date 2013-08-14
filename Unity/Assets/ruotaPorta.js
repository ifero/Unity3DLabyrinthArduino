var leftRight : boolean;
public var degrees : int = 100;
var timer;
var onDelay : boolean;
public var delay : int = 4; 

function Start(){
	leftRight=true;
	onDelay=false;
}

function Update () {

	if(!onDelay){	
		if (transform.localRotation.y>=0.7036){
			leftRight=false;
			timer=Time.time+delay;
			onDelay=true;
			//MyWaitFunction(2.0);
		}
		if (transform.localRotation.y<0){
			leftRight=true;
			timer=Time.time+delay;
			onDelay=true;		
			//MyWaitFunction(2.0);
		}
				
		if (leftRight)
			transform.Rotate(Vector3(0,degrees,0)*Time.deltaTime);
		else
			transform.Rotate(Vector3(0,-degrees,0)*Time.deltaTime); 
	}
	else
	{
		if(Time.time>=timer)
			onDelay=false;
	}
}
