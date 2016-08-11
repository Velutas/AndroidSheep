#pragma strict

var playLevel: PlayLevel;
playLevel = GameObject.Find("Main Camera").GetComponent(PlayLevel);

public var Tower : Transform;

private var LeftLimit = 0.18;
private var RightLimit = 34.3;
private var TopLimit = 8.6;
private var BottomLimit = -8.6;

private var CheckGreyScreen : boolean;
 
function Update () { 
	//This method for Greyscreening is not ideal at all
	if (playLevel.GreyScreenImage.active == false){
		//Spawns a tower at given location
		if (Input.GetTouch(0).phase == TouchPhase.Began)    {
		    var TouchPosition = Input.GetTouch(0).position;
		    var CreatePosition = Camera.main.ScreenToWorldPoint(Vector3(TouchPosition.x, TouchPosition.y, 20));
		    print (CreatePosition);
		    //Limit locations towers can spawn
			if(CreatePosition.x > LeftLimit && CreatePosition.x < RightLimit && CreatePosition.y > BottomLimit && CreatePosition.y < TopLimit){
				Instantiate (Tower, CreatePosition, Quaternion.identity);
			}
			else{
				print("Out of Bounds");
			}
		}
	}
}