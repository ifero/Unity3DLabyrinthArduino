public var degrees : int = 90;
public var velocity : int = 100;
public var rotateOnStart : boolean = true;
public var delay : int = 4; 
private var leftRight : boolean;
private var timer;
private var onDelay : boolean=false;
private var positive : boolean = true;

function Start(){
	leftRight=true;
	if (degrees<0){
		positive=false;
		degrees=360+degrees;		
		transform.localRotation.eulerAngles.y=359;
	}
	if (!rotateOnStart){
		timer=Time.time+delay;
		onDelay=true;
	}
}

function Update () {
	
	if(!onDelay){	
		if (positive){
			// Quando raggiungo una rotazioni di 'degrees' gradi, attendo 'delay' secondi e poi ruoto in senso contrario
			if ((transform.localRotation.eulerAngles.y>degrees)&&(leftRight==true)){
				transform.localRotation.eulerAngles.y=degrees-0.0001;
				leftRight=false;
				timer=Time.time+delay;
				onDelay=true;
			}
			
			// Quando torno alla posizione attendo 'delay' secondi e poi ruoto in senso contrario
			if ((transform.localRotation.eulerAngles.y>degrees)&&(leftRight==false)){
				transform.localRotation.eulerAngles.y=0.00;
				leftRight=true;
				timer=Time.time+delay;
				onDelay=true;		
			}
	
			if (leftRight)
				transform.Rotate(Vector3(0,velocity,0)*Time.deltaTime);
			else
				transform.Rotate(Vector3(0,-velocity,0)*Time.deltaTime); 
		}		
		else{ // Rotazione negativa
			// Quando raggiungo una rotazioni di 'degrees' gradi, attendo 'delay' secondi e poi ruoto in senso contrario
			if ((transform.localRotation.eulerAngles.y<degrees)&&(leftRight==true)){
				transform.localRotation.eulerAngles.y=degrees+0.0001;
				leftRight=false;
				timer=Time.time+delay;
				onDelay=true;
			}
			
			// Quando torno alla posizione iniziale, attendo 'delay' secondi e poi ruoto in senso contrario
			if ((transform.localRotation.eulerAngles.y<degrees)&&(leftRight==false)){
				transform.localRotation.eulerAngles.y=-0.00;
				leftRight=true;
				timer=Time.time+delay;
				onDelay=true;		
			}
	
			if (leftRight)
				transform.Rotate(Vector3(0,-velocity,0)*Time.deltaTime);
			else
				transform.Rotate(Vector3(0,velocity,0)*Time.deltaTime); 
		}		
	}
	else
	{
		if(Time.time>=timer)
			onDelay=false;
	}
}
