//Reset all data in the game


//TODO: Remove any pause/resume settings for levels

#pragma strict

public var Button : GUITexture;
public var WarningScreen : GUITexture;
public var Cancel : GUITexture;
public var Okay : GUITexture;

private var TaponButton;

function Start(){
	WarningScreen.enabled = false;
	Okay.enabled = false;
	Cancel.enabled = false;
}

function Update() {
	ResetData();
}

function ResetData(){
	if(Input.touchCount >= 1){
		if(Button.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				WarningScreenState(true, true, true, 1);
			}
       	}
       	else if(Cancel.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				WarningScreenState(false, false, false, 0);
			}
		}
		else if(Okay.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				WarningScreenState(false, false, false, 0);
				PlayerPrefs.DeleteAll();
			}
		}
	}
}

function WarningScreenState(Warn:boolean,Can:boolean,Ok:boolean,Disable:int){
	WarningScreen.enabled = Warn;
	Cancel.enabled = Can;
	Okay.enabled = Ok;
	PlayerPrefs.SetInt(("DisableGUI"), Disable);
}
