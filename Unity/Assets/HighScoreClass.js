function Awake()
{
	
}

class HighScores extends System.ValueType{
  var punteggio : float;
  var tempo : String;
  var nick : String;
 
  public function HighScores(punteggio:float,tempo:String,nick:String){
     this.punteggio = punteggio;
     this.tempo = tempo;
     this.nick = nick;
  }
  
}