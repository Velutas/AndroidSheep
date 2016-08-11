
var Lock1 : GUITexture;
var Lock2 : GUITexture;
var Lock3 : GUITexture;

var Access1 : GameObject;
var Access2 : GameObject;
var Access3 : GameObject;

var Unlock1 : int = 0;
var Unlock2 : int = 0;

Unlock1 = PlayerPrefs.GetInt("SavedLevel1");
Unlock2 = PlayerPrefs.GetInt("SavedLevel2");

function Update () {	
	if(Unlock1 == 0){  					
			Lock1.enabled = false;
			Access1.active = true;
			
			Lock2.enabled = true;
			Access2.active = false;
    }
	else if(Unlock1 == 1) {
			Lock1.enabled = false;
			Access1.active = true;
		//First Two Levels Both Unlocked
			Lock2.enabled = false;
			Access2.active = true;
	}
	if(Unlock2 == 0) {
		Lock3.enabled = true;
		Access3.active = false;
    }
    else if(Unlock2 == 2) {
    //All Three levels unlocked
		Lock3.enabled = false;
		Access3.active = true;
    }
}

