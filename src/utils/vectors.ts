import { Camera, Group, Vector3 } from "three";
import { ITransitionPose } from "../controllers/camera/TransitionCamera";
import { Sequence } from "../hooks/useCheckpoint";

export function screenFocusInVectors(screen: Group, camera: Camera): ITransitionPose {
  const screenCamPosition = new Vector3();
  screen.getWorldPosition(screenCamPosition);
  const cameraDirection = new Vector3();
  camera.getWorldDirection(cameraDirection);
  
  const initialPosition = camera.position.clone();
  const currentDirection = cameraDirection.normalize();
  const targetPosition = screenCamPosition.clone().add(new Vector3(0, 0, 2.3));
  const targetDirection = new Vector3(0, 0, 2.3).negate().normalize();

  return {srcPose: [initialPosition, currentDirection], dstPose: [targetPosition, targetDirection]};
}

export function screenFocusOutVectors(savedCameraState: { position: Vector3, direction: Vector3  }, camera: Camera ): ITransitionPose {
  const cameraDirection = new Vector3();
  camera.getWorldDirection(cameraDirection);
  
  const initialPosition = camera.position.clone();
  const currentDirection = cameraDirection.normalize();
  
  return {srcPose: [initialPosition, currentDirection], dstPose: [savedCameraState.position, savedCameraState.direction]};
}

export function spawnTransitionVectors(character: Group, camera: Camera, sequence: Sequence): ITransitionPose {

  let initialPosition = new Vector3();
  let targetPosition = new Vector3();
  let currentDirection = new Vector3();
  let targetDirection = new Vector3();
  
  let characterPos = new Vector3();
  characterPos = character.getWorldPosition(characterPos).add(new Vector3(0, 2.5, 0));

  targetPosition = characterPos.clone().add(new Vector3(-5, 1.5, 0));
  targetDirection = characterPos.clone().sub(targetPosition).normalize();

  if (sequence === Sequence.FirstSpawn) {
    initialPosition = characterPos.clone().add(new Vector3(0, 0, 5));
    currentDirection = characterPos.clone().sub(initialPosition).normalize();
    
    camera.position.copy(initialPosition);
    
  } else if(sequence === Sequence.Respawn) {
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    initialPosition = camera.position.clone();
    currentDirection = cameraDirection.normalize();
  }

  return {srcPose: [initialPosition, currentDirection], dstPose: [targetPosition, targetDirection]}
}