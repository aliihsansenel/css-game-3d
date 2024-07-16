import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { ElementRef, MutableRefObject, createContext, useRef } from "react";
import { Controls } from "./input/KeyboardController";
import Character from "../entities/Character";
import { Group, Vector3 } from "three";

const JUMP_FORCE = 1.5;
const MOVEMENT_SPEED = 0.3;
const MAX_VEL = 3;

export interface AnimationStateDispatcher {
  (anim: string, vel: number): void;
}

export const AnimationStateContext = createContext<MutableRefObject<AnimationStateDispatcher> | null>(null);

export const CharacterController = () => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );
  const rigidbody = useRef<ElementRef<typeof RigidBody>>(null);
  const animStateDispatcher = useRef<(anim: string, vel: number) => void>(() => {});

  const character = useRef<Group>(null!);
  const isOnFloor = useRef(true);
  
  useFrame(() => {
    let impulse = { x: 0, y: 0, z: 0 };
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
    }

    const linvel = rigidbody.current?.linvel() || new Vector3();
    const linvelMagnitude = new Vector3(linvel.x, linvel.y, linvel.z).length();

    let changeRotation = false;
    if (rightPressed && linvel?.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (forwardPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    const norm = new Vector3(impulse.x, impulse.y, impulse.z).normalize();
    impulse = { x: norm.x, y: norm.y, z: norm.z };

    rigidbody.current?.applyImpulse(impulse, true);
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
    }

    if (linvelMagnitude < 0.1) {
      animStateDispatcher.current('Idle', linvelMagnitude)
    } else if (linvelMagnitude > 0.1) {
      animStateDispatcher.current('Walking', linvelMagnitude)
    }
  });

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
        <CapsuleCollider args={[0.65, 0.6]} position={[-6, 1.2, -4]}/>
        <group ref={character} position={[-6, 0, -4]} >
          <AnimationStateContext.Provider value={animStateDispatcher}>
            <Character />
          </AnimationStateContext.Provider>
        </group>
      </RigidBody>
    </group>
  );
};