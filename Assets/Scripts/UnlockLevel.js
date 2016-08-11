//On end level complete, unlock next level

//CURRENTLY FUNCTIONING AS A BUTTON!!! SET AS RETURN BUTTON

//NEEDS TO BE UPDATED AS AN ON TRIGGER EVENT 

/*
Intended Behaviour:

Case 1: Win the game!												[x]
Trigger: Remaining Enemies = 0										[x]
Results: 															[x]
1. Congratulation screen is displayed								[x]
2. Next level in unlocked											[x]
3. Game Pause, grey out over rest of Screen							[x]
4. Three buttons: Next Level, Replay & Return to Level Select		[x]
5. Other buttons on screen are not accessible						[x]

Case 2: Defeat!														[x]
Trigger: HP = 0  (Total of 5)										[x]
Results:															[x]
1. Defeat screen is displayed										[x]
2. Game Pause, grey out over rest of Screen							[x]
3. Two buttons, Replay & Return to Level Select						[x]
4. Other buttons on screen are not accessible						[x]


*/
#pragma strict

var playLevel : PlayLevel;
playLevel = GameObject.Find("Main Camera").GetComponent(PlayLevel);

private var Unlocked : int;

function Tap(){
	Unlocked = PlayerPrefs.GetInt("SavedLevels");
	
	//Button appears for user to click
	if(playLevel.GetGameWin() == true){ //TODO: When it is possible to win complete win screen
		if(Unlocked < playLevel.LevelToUnlock){
			PlayerPrefs.SetInt(("SavedLevels"), playLevel.LevelToUnlock);
		}
		playLevel.WinMenu.enabled = true;
		playLevel.ReturnToLevelSelect.enabled = true;
		playLevel.NextLevel.enabled = true;
		playLevel.PlayAgain.enabled = true;
		playLevel.GreyScreenImage.active = true; //Fudge. 
		
		//Disable other buttons
		playLevel.PauseButton.enabled = false;
		playLevel.ResumeButton.enabled = false;
		playLevel.MenuButton.enabled = false;
		
		if(Input.touchCount == 1){
	       	if(playLevel.ReturnToLevelSelect.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase==TouchPhase.Ended){	
					Application.LoadLevel(playLevel.LoadThisLevel);  //User gives up and goes back to LevelSelect
					playLevel.SetGreyScreen(false);
				}
	       	}
	       	if(playLevel.PlayAgain.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase==TouchPhase.Ended){				
					Application.LoadLevel(playLevel.LoadCurrentLevel);  //User gives up and goes back to LevelSelect
					playLevel.SetGreyScreen(false);
				}
	       	}
	       	if(playLevel.NextLevel.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase==TouchPhase.Ended){		
					Application.LoadLevel(playLevel.LoadNextLevel);  //User gives up and goes back to LevelSelect
					playLevel.SetGreyScreen(false);
				}
	       	}
		}
	}
	
	else{
		playLevel.LoseMenu.enabled = true;
		playLevel.PlayAgain.enabled = true;
		playLevel.ReturnToLevelSelect.enabled = true;
		
		//Disable other buttons
		playLevel.PauseButton.enabled = false;
		playLevel.ResumeButton.enabled = false;
		playLevel.MenuButton.enabled = false;
		playLevel.ReturnAgree.enabled = false;
		
		//playLevel.SetGreyScreen(true); //I DUNNO WHY THIS ISN'T WORKING TODO: Fix
		//Temp Fix:
		//FUDGE! The fix lets towers be placed even though it should be disabled!
		//Changed the way Towers appear so it works, but still not ideal...
		playLevel.GreyScreenImage.active = true;
		
		if(Input.touchCount == 1){
	       	if(playLevel.ReturnToLevelSelect.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase==TouchPhase.Ended){
					Application.LoadLevel(playLevel.LoadThisLevel);  //User gives up and goes back to LevelSelect
					playLevel.SetGreyScreen(false);
				}
	       	}
	       	if(playLevel.PlayAgain.HitTest(Input.GetTouch(0).position)){
				if(Input.GetTouch(0).phase==TouchPhase.Ended){	
					Application.LoadLevel(playLevel.LoadCurrentLevel);  //User gives up and goes back to LevelSelect
					playLevel.SetGreyScreen(false);
				}
	       	}
		}
	}
}

