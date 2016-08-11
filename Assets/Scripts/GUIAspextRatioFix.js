#pragma strict

public var RatioScaling : Vector2;
private var Transformation : Transform;
private var WHRatio : float;

function Start (){ 
	Transformation = transform;
	RatioFix();
}

function Update(){
	RatioFix();
}

function RatioFix(){
	WHRatio = (Screen.width/Screen.height);
	Transformation.localScale = new Vector3(RatioScaling.x, WHRatio * RatioScaling.y, 1);
}


