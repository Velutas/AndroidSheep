//CURRENTLY NOT FUNCTIONAL

#pragma strict

public var FramesPerSecond : float;
public var FrameNumber : Texture[];
public var LoopFrames : boolean;

private var StopAnimation : boolean;
private var WaitingTime;
private var CurrentFrame : int;


function Start(){
	CurrentFrame = 0;
	WaitingTime = 1/FramesPerSecond;
	Animate();
}

function Update(){
	if(StopAnimation != true){
		Animate();
	}
}

function Animate(){
	StopAnimation = false;	
	if(CurrentFrame >= FrameNumber.Length){
		if(LoopFrames == true){
			CurrentFrame = 0;
		}
	}
	
	yield new WaitForSeconds(WaitingTime);
	renderer.material.mainTexture = FrameNumber[CurrentFrame];
	CurrentFrame++;
}
	
