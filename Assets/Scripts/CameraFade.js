#pragma strict

public var LeveltoLoad = "MainMenu";
public var LoadingScreen : Texture2D;
public var FadeRate = 0.15;
public var DisplayTime = 2;

//For GUI.depth -> GUI elements with lower values appear on top of those with higher values
//Used when there are multiple scripts running simultaneously
private var Depth = 0;
private var FadeAmount = 1.0;  //FadeOut -> 1 = Texture displayed, 0 = Texture is no longer displayed
private var FadeDir = -1;
private var CycleComplete = 0;
private var LogoH = 100;
private var LogoW = 100;


//Begin
function Start(){
	FadeAmount=1;
	FadeIn();
} 
//Fade into screen
function FadeIn(){
	FadeDir = -1;	
}
//Fade out of the screen
function FadeOut(){
	FadeDir = 1;	
}

function OnGUI(){
	GUI.color.a = 1-FadeAmount;
	GUI.depth = Depth;
	GUI.DrawTexture(Rect(Screen.width/2-(LogoW/2), Screen.height/2-(LogoH/2), LogoH, LogoW), LoadingScreen);
	
	FadeAmount += Time.deltaTime * FadeDir * FadeRate;	
	FadeAmount = Mathf.Clamp01(FadeAmount);	//Mathf.Clamp01 keeps value between 0 and 1. Takes float
	
	if (FadeAmount==0){
		//yield WaitForSeconds(DisplayTime);
		FadeOut();
		FadeRate = .2;
		CycleComplete =1;
	}
	if(FadeAmount==1 && CycleComplete == 1){
		Application.LoadLevel(LeveltoLoad);
	}
}
