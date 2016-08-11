//For animations -> Convert to javascript. srsly

using UnityEngine;
using System.Collections;

public class Animation : MonoBehaviour {
	

	public float FramesPerSecond;
	private float WaitingTime;
	public Texture[] FrameNumber;
	public bool LoopFrames;
	
	private int CurrentFrame;
	
	
	void Start () {
		CurrentFrame = 0;
		WaitingTime = 1/FramesPerSecond;
		StartCoroutine(Animate ());
	}
	
	IEnumerator Animate(){
		bool StopAnimation = false;	
		if(CurrentFrame >= FrameNumber.Length){
			if(LoopFrames == true){
				CurrentFrame = 0;
			}
		
		}
		
		yield return new WaitForSeconds(WaitingTime);
		renderer.material.mainTexture = FrameNumber[CurrentFrame];
		CurrentFrame++;
		
		if(StopAnimation != true){
			StartCoroutine(Animate());
		}
		
	}
	
}
