#pragma strict

public var Projectile : GameObject;

public var ProjSpeed : float;
public var FiringRate : float;
public var FireRadius : float;

private var Target : GameObject;
private var NewProjectile : GameObject;

private var Coll : Collider;
private var Adjustment : Vector3;
Adjustment = Vector3(0,0,0);

function Start () {
	InvokeRepeating("SpawnProjectile", FiringRate, FiringRate);
}

function SpawnProjectile(){
	
	//Select Enemy
	for (Coll in Physics.OverlapSphere(transform.position, FireRadius)){
		if(Coll.tag == "Enemy"){
			Target = Coll.gameObject;
			break;
		}
	}
	if(Target != null){
		//Fire at Enemy
		NewProjectile = Instantiate(Projectile, transform.position, Projectile.transform.rotation) as GameObject;
		NewProjectile.rigidbody.AddForce((Target.transform.position - (transform.position + Adjustment)).normalized*ProjSpeed, ForceMode.VelocityChange);
	
	}
	
	//Target = GameObject.FindGameObjectWithTag("Enemy");
	
}