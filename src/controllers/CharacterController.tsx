import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, Vector3Tuple } from "@react-three/rapier";
import { ElementRef, MutableRefObject, createContext, useCallback, useContext, useEffect, useRef } from "react";
import { Controls } from "./input/KeyboardController";
import Character from "../entities/Character";
import { Group, Quaternion, Vector3 } from "three";
import { CameraTargetContext } from "./CameraController";

const JUMP_FORCE = 10.5;
const MOVEMENT_SPEED = 0.3;
const MAX_VEL = 4;
const MID_AIR_CONTROL = 0.33;
 
export interface AnimationStateDispatcher {
  (anim: string, vel: number): void;
}

export const AnimationStateContext = createContext<MutableRefObject<AnimationStateDispatcher> | null>(null);

export interface CharacterControllerProps {
  position: Vector3Tuple;
}

export const CharacterController = ({position}: CharacterControllerProps) => {
  const { camera } = useThree();
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const rigidbody = useRef<ElementRef<typeof RigidBody>>(null);
  const animStateDispatcher = useRef<(anim: string, vel: number) => void>(() => {});
  const cameraTargetContext = useContext(CameraTargetContext);

  const character = useRef<Group>(null!);
  const isOnFloor = useRef(true);
  const jumpCooldown = useRef(false);

  const handleJump = useCallback(() => {
    if (isOnFloor.current && !jumpCooldown.current) {
      jumpCooldown.current = true;
      setTimeout(() => {
        jumpCooldown.current = false;
      }, 700); 

      return JUMP_FORCE;
    }
    return 0;
  }, []);

  useFrame(() => {
    let impulse = { x: 0, y: 0, z: 0 };

    const characterPos = new Vector3();
    character.current.getWorldPosition(characterPos);

    if (characterPos.y < 0) {
      impulse.y = Math.min(Math.pow(-characterPos.y, 1.8) * 3.0, 60.0);
      isOnFloor.current = false;
    } else if (jumpPressed) {
      impulse.y += handleJump();
      if (impulse.y > 0) {
        isOnFloor.current = false;
      }
    }

    const linvel = rigidbody.current?.linvel() || new Vector3();
    const linvelVec = new Vector3(linvel.x, linvel.y, linvel.z);
    const linvelMagnitude = linvelVec.length();

    let changeRotation = false;
    const cameraDirection = new Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const up = new Vector3(0, 1, 0);
    const quat = new Quaternion();
    quat.setFromAxisAngle(up, Math.PI / 2);
    const rotatedVec = cameraDirection.clone().applyQuaternion(quat);
    const rightVec = linvelVec.clone().projectOnVector(rotatedVec);

    const dotH = rightVec.dot(linvelVec);
    const dotV = cameraDirection.dot(linvelVec);

    if (rightPressed && dotH < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftPressed && dotH < MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backPressed && dotV > -MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (forwardPressed && dotV < MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    let dir = new Vector3(impulse.x, 0.0, impulse.z).normalize();
    const direction = new Vector3(0, 0, -1);
    const quaternion = new Quaternion().setFromUnitVectors(direction, cameraDirection);

    dir = dir.applyQuaternion(quaternion);
    dir = dir.multiplyScalar(isOnFloor.current ? 1.0 : MID_AIR_CONTROL);

    impulse = { x: dir.x, y: impulse.y, z: dir.z };

    if(!cameraTargetContext?.isCameraToggled){
      rigidbody.current?.applyImpulse(impulse, true);
      if (changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z);
        character.current.rotation.y = angle;
      }
    }
      

    if (linvelMagnitude < 0.1) {
      animStateDispatcher.current('Idle', linvelMagnitude)
    } else if (linvelMagnitude > 0.1) {
      animStateDispatcher.current('Walking', linvelMagnitude)
    }
  });

  useEffect(() => {
    if (cameraTargetContext)
      cameraTargetContext.setCharacter(character.current);
  }, [cameraTargetContext]);

  const p = position;
  // FIX this component renders every frame because of useKeyboardControls
  return (
    <group>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        // onContactForce={(payload) => {
        //   if (jumpPressed) {
        //     console.log(`The total force generated was: ${payload.totalForce.y}`);
        //   }
        // }}
      
      >
        <CapsuleCollider args={[0.65, 0.6]} position={[p[0], p[1] + 1.2, p[2]]}/>
        <group ref={character} position={p} >
          <AnimationStateContext.Provider value={animStateDispatcher}>
            <Character />
          </AnimationStateContext.Provider>
        </group>
      </RigidBody>
    </group>
  );
};