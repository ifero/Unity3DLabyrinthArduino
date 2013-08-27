public var degrees : int=-100;

function Update () {
	transform.Rotate(Vector3(0,degrees,0)*Time.deltaTime);
}