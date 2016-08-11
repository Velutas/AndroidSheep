/*
Inteded Behaviour:

TODO: Delete enemies when they are destroyed or reach the end.

Note: Grey Screen on hold until functionality complete			[x]

Attach to Main Camera.

Return to Main Menu   -> Function called from update			[]
1. Warning screen appears										[x]
2. Two buttons: I'm sure & Nevermind							[x]
3. Warning: All your progress will be lost!						[]
4. Game is frozen												[x]
5. Grey screen over playing area								[x]


Pause/Resume       -> Functions called from update 				[x]
Pause:  														[x]
1. Grey screen over playing area 								[x]
2. Game is frozen 												[x]
3. Pause button is disabled										[x]
4. Resume button is enabled 									[x]

Resume: 														[x]
1. Grey screen disappears										[x]
2. Game unfreezes												[x]
3. Pause button is enabled										[x]
4. Resume button is disabled									[x]

Play Game:														[]
Start: 															[]
1. Music plays 													[]
2. Countdown from 3 -> Function called from start 				[x]
3. Get time -> time = Time.time; or something similar			[x]

Update: 														[]
1. Get Money -> Condition is passage of time 					[]
2. Enemies begin to move -> Condition is passage of time 		[x]
3. SET NUMBER OF WAVES & ENEMIES IN WAVE TO PUBLIC				[x]
4. Enemies speed and settings called from EnemyData(xxxx);		[x] 
5. Show Progress bar for Weapons -> 3 weapons 3 projectiles 	[]
6. If GreyScreen = true movementspeeds should all be set to 0!	[x]

OnGUI:															[]
1. Display locations that weapons can placed 					[]
2. Display locations weapons can be pruchased 					[]
3. Display movement of projectiles 								[x]
4. If Menu item is clicked display a grey screen 				[x]
5. Display money player has 									[]

Countdown:														[x]
1. Display all numbers in countdown over 3 seconds  			[x]
*/

#pragma strict
//var UnlockLevel:UnlockLevel; //Call functions from UnlockLevel.js
var unlockLevel : UnlockLevel;
unlockLevel = GameObject.Find("POPUP WINDOWS").GetComponent(UnlockLevel); 
var enemyMovement : EnemyMovement;
enemyMovement = GameObject.Find("ENEMY").GetComponent(EnemyMovement);
var playMenu : PlayMenu;
playMenu = GameObject.Find("GREYSCREEN").GetComponent(PlayMenu);

public var GreyScreenImage : GameObject;
public var LevelToUnlock : int;

//Main Menu Buttons
public var MenuButton : GUITexture;
public var PauseButton : GUITexture;
public var ResumeButton : GUITexture;

//Return to Main Menu GUI
public var ReturnToMenu : GUITexture;
public var ReturnAgree : GUITexture;
public var ReturnDisagree : GUITexture;

public var LoadThisLevel : String;
public var LoadNextLevel : String;
public var LoadCurrentLevel : String;

//Won & Lose game menu GUI
public var WinMenu : GUITexture;
public var LoseMenu : GUITexture;
public var PlayAgain : GUITexture;
public var ReturnToLevelSelect : GUITexture;
public var NextLevel : GUITexture;

//Textures for Countdown
public var CountdownThree : GUIText;
public var CountdownTwo : GUIText;
public var CountdownOne : GUIText;

//Use time to control functions
private var StartTime;
private var RecordTime;

//When set to true -> STOP ALL MOVEMENT
private var GreyScreen : boolean = false;

//Don't start till Countdown is done
private var CountdownComplete : boolean = false;

//VARIABLES FOR GAME
public var EnemyType : GameObject[]; //Check in loop then switch case
public var Waves : int;
public var NumEnemyPerWave : int;
public var TimeToNextEnemy : int;

public var PathPoints : GameObject[];

public var Speed : float;
public var Goal : float;

private var PathIndex : int = 0;
private var Direction : Vector3; 

private var CurrentEnemy : int = 0; //Set up current enemy so that it corresponts with going wavetype
private var CurrentWave : int = 0;

private var StartPosition : Vector3;
private var StartRotation : Quaternion;
private var NumEnemiesReachEnd : int = 0;

private var Currency : int = 0;
private var Points : int = 0;
private var GameComplete : boolean = false;
private var GameBegin : boolean = false;

private var GameWin : boolean = false;
private var EnemiesKilled : int = 0;
//Functions for Playing Game

function Start () {
	//By default Game does not display the following menus
	Time.timeScale = 1;
	MenuButton.enabled = false;
	PauseButton.enabled = false;
	ResumeButton.enabled = false;
	ReturnToMenu.enabled = false;
	ReturnAgree.enabled = false;
	ReturnDisagree.enabled = false;
	WinMenu.enabled = false;
	LoseMenu.enabled = false;
	PlayAgain.enabled = false;
	ReturnToLevelSelect.enabled = false;
	NextLevel.enabled = false;
	CountdownOne.enabled = false;
	CountdownTwo.enabled = false;
	CountdownThree.enabled = false;
	
	GreyScreenImage.active = true;

	//Get Time
	RecordTime = Time.time;
	StartTime = Time.timeSinceLevelLoad;
	
	//Check beginning position
	StartPosition = EnemyType[0].transform.position;
	StartRotation = EnemyType[0].transform.rotation;
	
	//StartMusic
	
	//Display Countdown before start of game
	playMenu.Countdown();
	MenuButton.enabled = true;
	PauseButton.enabled = true;
}

function Update () {
	if(CountdownComplete == true){
		//Begin Game
		if(GreyScreen == true){
			GreyScreenImage.active = true;
			Time.timeScale=0;
		}
		else if(GameComplete == true){
			unlockLevel.Tap();
			Time.timeScale = 0;
		}
		else{
			//PLAYGAME
			GameBegin = true;
			GreyScreenImage.active = false;
			Time.timeScale=1;
			
			//Movement of leader enemy
			enemyMovement.SetLeader(true);
			enemyMovement.GamePlay();
			
			//Adding eneimes
			enemyMovement.EnemyReplicate();
		}
	}
	playMenu.ReturnMenu();
	playMenu.Pause();
	playMenu.Resume();
	
	if(EnemiesKilled+NumEnemiesReachEnd == Waves*NumEnemyPerWave && NumEnemiesReachEnd < 6){
		GameWin = true;
		GameComplete = true;
	}
}


//GET VARIABLES
function GetStartTime(){			return StartTime;			}
function GetRecordTime(){			return RecordTime;			}
function GetGreyScreen(){			return GreyScreen;			}
function GetCountdownComplete(){	return CountdownComplete;	}
function GetPathIndex(){			return PathIndex;			}
function GetDirection(){			return Direction;			}
function GetCurrentEnemy(){			return CurrentEnemy;		}
function GetCurrency(){				return Currency;			}
function GetPoints(){				return Points;				}
function GetGameComplete(){			return GameComplete;		}
function GetGameWin(){				return GameWin;				}
function GetStartPosition(){		return StartPosition;		}
function GetStartRotation(){		return StartRotation;		}
function GetGameBegin(){			return GameBegin;			}
function GetNumEnemiesReachEnd(){	return NumEnemiesReachEnd;	}
function GetCurrentWave(){			return CurrentWave;			}
function GetEnemiesKilled(){		return EnemiesKilled;		}

//SET Variables
function SetGreyScreen(greyScreen : boolean){
	GreyScreen = greyScreen;
}
function SetCountdownComplete(countdownComplete : boolean){
	CountdownComplete = countdownComplete;
}
function SetPathIndex(pathIndex : int){
	PathIndex = pathIndex;
}
function SetDirection(direction : Vector3){
	Direction = direction;
}
function SetDirectionZ(direction : int){
	Direction.z = direction;
}
function SetCurrentEnemy(currentEnemy : int){
	CurrentEnemy = currentEnemy;
}
function SetCurrency(currency : int){
	Currency = currency;
}
function SetPoints(points : int){
	Points = points;
}
function SetGameComplete(gameComplete : boolean){
	GameComplete = gameComplete;
}
function SetGameWin(gameWin : boolean){
	GameWin = gameWin;
}
function SetNumEnemiesReachEnd(num : int){
	NumEnemiesReachEnd = num;
}
function SetCurrentWave(currentWave : int){
	CurrentWave = currentWave;
}
function SetEnemiesKilled(enemiesKilled : int){
	EnemiesKilled = enemiesKilled;
}