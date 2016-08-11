//Level Select Screen organize and set up for Loading levels
#pragma strict

public var Map01 : GUITexture;
public var Map02 : GUITexture;
public var Map03 : GUITexture;

public var Lock01 : GUITexture;
public var Lock02 : GUITexture;
public var Lock03 : GUITexture;
//public var LoadThisLevel : String; //TODO: FIX CODE SO THAT THERE IS NO REPETITION

private var Unlocked : int = 0;
private var Disable : int = 0;

Unlocked = PlayerPrefs.GetInt("SavedLevels");
Disable = PlayerPrefs.GetInt("DisableGUI");

function Start () {
}

function Update () {
	Unlocked = PlayerPrefs.GetInt("SavedLevels");
	Disable = PlayerPrefs.GetInt("DisableGUI");
	if (Unlocked >=0){
		Map01.enabled = true;
		Lock01.enabled = false;		
	}
	else{
		Map01.enabled = false;
		Lock01.enabled = true;
	}
	if (Unlocked >= 1){
		Map02.enabled = true;
		Lock02.enabled = false;
	}
	else{
		Map02.enabled = false;
		Lock02.enabled = true;
	}
	if(Unlocked >=2){
		Map03.enabled = true;
		Lock03.enabled = false;
	}
	else{
		Map03.enabled = false;
		Lock03.enabled = true;
	
	}
}

function OnGUI(){
	SelectLevel();
}

function SelectLevel(){
	if(Input.touchCount > 0){
		if(Map01.HitTest(Input.GetTouch(0).position) && Unlocked >= 0 && Disable != 1){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				MiniPause();
				Application.LoadLevel("Map01");//Load level select
			}
		}
		else if(Map02.HitTest(Input.GetTouch(0).position) && Unlocked >= 1 && Disable != 1){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				MiniPause();
				Application.LoadLevel("Map02");//Load level select
			}
		}
		else if(Map03.HitTest(Input.GetTouch(0).position) && Unlocked >= 2 && Disable != 1){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				MiniPause();
				Application.LoadLevel("Map03");//Load level select
			}
		}
	}	
}

function MiniPause(){
	yield new WaitForSeconds(0.20);
}
