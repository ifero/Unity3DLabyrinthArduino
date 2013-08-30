
public var startTime : float;
var textTime : String;
var Flag : boolean;
var guiTime : float;

function Start () {
	startTime=Time.time;
	Flag=true;
}

function Update () {
	if (Flag)
	{
		guiTime=Time.time-startTime;
		
		var minutes = Mathf.Floor(guiTime/60);
		var seconds = Mathf.Floor(guiTime%60);
		var fraction = (guiTime *100)%100;
		
		textTime=String.Format("{0:00}:{1:00}:{2:00}",minutes,seconds,fraction);
		
		GetComponent(GUIText).text = textTime;
	}
}