#pragma strict

var playLevel : PlayLevel;
playLevel = GameObject.Find("Main Camera").GetComponent(PlayLevel);
public var DefeatCondition : int;

private var direction : Vector3;
private var pathIndex : int = 0;

private var startPosition : Vector3;
private var startRotation : Quaternion;

private var RepTime : float = 0;
private var EnemyNum : int = 0;

private var Leader : boolean = false;
private var FirstOfWave : boolean = false;
private var WaveCounter : int = 0;

//ENEMY DEATH BY PROJECTILE
public var Health : int = 3;
private var TotalKilled : int;

function Start () {
	direction = (playLevel.PathPoints[pathIndex].transform.position - transform.position).normalized;
}

function Update(){
	if(playLevel.GetGameBegin() == true && Leader == false){
		transform.position += direction*playLevel.Speed*Time.deltaTime;
	}	
}

function SetLeader(leader : boolean){	Leader = leader;	}

function GamePlay (){
	transform.position += direction*playLevel.Speed*Time.deltaTime;
}

function OnTriggerEnter (other : Collider){
	if(other.gameObject.name == playLevel.PathPoints[pathIndex].name){
		
		//NOTE: Enemy stops on last waypoint. Currently game over at 3 enemy reaching endpoint
		if(pathIndex == playLevel.PathPoints.length-1){
			print("Enemy Reaches End");
			var num = playLevel.GetNumEnemiesReachEnd();
			playLevel.SetNumEnemiesReachEnd(num+1);
			if(playLevel.GetNumEnemiesReachEnd() == DefeatCondition){
				print("Defeat");
				playLevel.SetGameComplete(true); //TODO: ACTIVATE!
			}
			//playLevel.SetGameWin(false); //NOT NECESSAY => leaving here for clarity
			
			//Destroy the enemy
			if(Leader == false){
				Destroy(gameObject);
			}
		}
		
		else{
			transform.position = playLevel.PathPoints[pathIndex].transform.position;
			pathIndex++;
		
			direction = ((playLevel.PathPoints[pathIndex].transform.position - transform.position).normalized);
		}
	}
}

function EnemyReplicate(){
	startPosition = playLevel.GetStartPosition();
	startRotation = playLevel.GetStartRotation();
	
	RepTime += Time.deltaTime;
	
	
	if(RepTime >= playLevel.TimeToNextEnemy &&  EnemyNum < playLevel.NumEnemyPerWave && playLevel.GetCurrentEnemy() < playLevel.EnemyType.length  && WaveCounter < playLevel.Waves){
		//print("New Enemy");
		
		Instantiate (playLevel.EnemyType[playLevel.GetCurrentEnemy()], startPosition, startRotation);
		RepTime = 0;
		EnemyNum++;
		
		if(FirstOfWave == true){
			//print("NewLevel");
			FirstOfWave = false;
			playLevel.TimeToNextEnemy = (playLevel.TimeToNextEnemy)/2;
		}
		if(playLevel.NumEnemyPerWave-1 == EnemyNum){
			//Once num enemies in wave has been reached set current enemy up one to next wave => one enemy for each wave
			var temp = playLevel.GetCurrentEnemy() + 1;
			playLevel.SetCurrentEnemy(temp);
			print("End of Wave " + playLevel.GetCurrentEnemy());
			playLevel.TimeToNextEnemy = playLevel.TimeToNextEnemy*2;
			FirstOfWave = true;
			EnemyNum = -1; //First enemy not counted
			WaveCounter++;
		}		
		
	}	
}

//Death of Enemy
function OnCollisionEnter(Projectile : Collision){
	if (Projectile.collider.tag == "Projectile"){
		Health = Health - 1;
		Destroy(Projectile.gameObject);
	}
	if (Health <= 0 && Leader == false){
		Destroy(gameObject);
		TotalKilled = playLevel.GetEnemiesKilled()+1;
		playLevel.SetEnemiesKilled(TotalKilled);
	}
	else if (Health <=0 && Leader == true){
		gameObject.active = false;
		//gameObject.SetActive(false);
		TotalKilled = playLevel.GetEnemiesKilled()+1;
		playLevel.SetEnemiesKilled(TotalKilled);
	}
}
