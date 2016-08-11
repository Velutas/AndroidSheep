var LoadThisLevel : String;

var QuitButton : boolean = false;
var PauseButton : boolean = false;
var ResumeButton : boolean = false;
var SpeedUP: boolean = false;

var ButtonPress : AudioSource;

private var CurrentFrame : int = 0;
var FramesPerSecond : float;
var FrameNumber : Texture[];

private var WaitingTime : float;

function OnMouseUp(){

	yield new WaitForSeconds(0.001);
	if(QuitButton){
		ButtonPress.Play();
		Application.Quit();
	}
	else if (PauseButton){	
		
		CurrentFrame = 0;
		WaitingTime = 1/FramesPerSecond;
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		yield new WaitForSeconds(WaitingTime);
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
	
		Time.timeScale = 0.01f;
		ButtonPress.Play();
		//audio.PlayOneShot(ButtonPress);
	}
	else if (ResumeButton){
		Time.timeScale = 1;
		CurrentFrame = 0;
		WaitingTime = 1/FramesPerSecond;
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		yield new WaitForSeconds(WaitingTime);
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		ButtonPress.Play();
	}
	else if(SpeedUP){
		Time.timeScale = 3.5f;
		CurrentFrame = 0;
		WaitingTime = 1/FramesPerSecond;
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		yield new WaitForSeconds(WaitingTime);
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		ButtonPress.Play();
	}
	else{
	
		CurrentFrame = 0;
		WaitingTime = 1/FramesPerSecond;
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		yield new WaitForSeconds(WaitingTime);
		renderer.material.mainTexture = FrameNumber[++CurrentFrame];
		ButtonPress.Play();
		yield new WaitForSeconds(1);
		Application.LoadLevel(LoadThisLevel);
	}
}