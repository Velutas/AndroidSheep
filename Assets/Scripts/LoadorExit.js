//For Main Menu buttons -> Exit & Open Level Select screen
#pragma strict

public var Button : GUITexture;
public var LoadThisLevel : String;
public var QuitButton : boolean = false;

private var TaponButton;

function Update(){
	Tap();
}

function Tap(){
	if(Input.touchCount == 1){
		TaponButton = Button.HitTest(Input.GetTouch(0).position);
	
		if(TaponButton){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				if(QuitButton){
					print("Exiting Application");
					Application.Quit(); //Exit Application
				}
				else{
					Application.LoadLevel(LoadThisLevel);//Load level select
				}
			}
       	}
	}
}