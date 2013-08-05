#pragma strict
private var startTime:float;
var textTime:String;
var Flag:boolean;

function Start () {
	startTime=Time.time;
	Flag=true;
}

function Update () {
	
	if (Flag)
	{
		var guitime=Time.time-startTime;
		var minutes = guitime/60;
		var seconds = guitime%60;
		var fraction = (guitime *100)%100;
		
		textTime=String.Format("{0:00}:{1:00}:{2:00}",minutes,seconds,fraction);
		GetComponent(GUIText).text = textTime;
	}
}