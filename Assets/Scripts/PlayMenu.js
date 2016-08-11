#pragma strict

var playLevel: PlayLevel;
playLevel = GameObject.Find("Main Camera").GetComponent(PlayLevel);

function Countdown(){
	playLevel.CountdownThree.enabled = true;
	//WAIT 3 seonds
	yield WaitForSeconds (1);
	playLevel.CountdownThree.enabled = false;
	playLevel.CountdownTwo.enabled = true;
	yield WaitForSeconds(1);
	playLevel.CountdownTwo.enabled = false;
	playLevel.CountdownOne.enabled = true;
	yield WaitForSeconds(1);
	playLevel.CountdownOne.enabled = false;
	playLevel.SetCountdownComplete(true);
}

function Pause(){
	if(Input.touchCount == 1){
		if(playLevel.PauseButton.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				playLevel.PauseButton.enabled = false;
				playLevel.ResumeButton.enabled = true;
				playLevel.SetGreyScreen(true);	
			}
       	}
	}
}

function Resume(){
	if(Input.touchCount == 1){
		if(playLevel.ResumeButton.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				playLevel.PauseButton.enabled = true;
				playLevel.ResumeButton.enabled = false;
				playLevel.SetGreyScreen(false);
			}
       	}
	}
}

function ReturnMenu(){
	if(Input.touchCount >= 1){
		if(playLevel.MenuButton.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				playLevel.SetGreyScreen(true);
				MenuWarning(true, true, true, 1);
			}
       	}
       	else if(playLevel.ReturnDisagree.HitTest(Input.GetTouch(0).position)){
       		// Close Menu and Return to Game => Do not unpause if paused
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				if(playLevel.PauseButton.enabled == true){
					playLevel.SetGreyScreen(false);
					MenuWarning(false, false, false, 0);
				}
				else{
					MenuWarning(false, false, false, 0);
				}
			}
		}
		else if(playLevel.ReturnAgree.HitTest(Input.GetTouch(0).position)){
			if(Input.GetTouch(0).phase==TouchPhase.Ended){
				playLevel.SetGreyScreen(false);
				MenuWarning(false, false, false, 0);
				playLevel.SetGreyScreen(false);
				
				//TODO: REMOVE THIS!!!!!
				//PlayerPrefs.SetInt(("SavedLevels"), 2);
				
				Application.LoadLevel(playLevel.LoadThisLevel);
			}
		}
	}
}

function MenuWarning(Warn:boolean,Can:boolean,Ok:boolean,Disable:int){
	playLevel.ReturnToMenu.enabled = Warn;
	playLevel.ReturnDisagree.enabled = Can;
	playLevel.ReturnAgree.enabled = Ok;
	
	PlayerPrefs.SetInt(("DisableGUI"), Disable);
}