import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { ElementRef, useRef } from "react";
import { Controls } from "./input/KeyboardController";
import Character from "../entities/Character";
import { Group, Vector3 } from "three";

const JUMP_FORCE = 1.5;
const MOVEMENT_SPEED = 0.3;
const MAX_VEL = 3;

export const CharacterController = () => {
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const rigidbody = useRef<ElementRef<typeof RigidBody>>(null);
  const character = useRef<Group>(null!);

  const isOnFloor = useRef(true);

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };
    if (jumpPressed && isOnFloor.current) {
      impulse.y += JUMP_FORCE;
      isOnFloor.current = false;
    }

    const linvel = rigidbody.current?.linvel() || new Vector3() ;
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

    rigidbody.current?.applyImpulse(impulse, true);
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      character.current.rotation.y = angle;
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
        <CapsuleCollider args={[0.65, 0.5]} position={[-6, 1.2, -4]}/>
        <group ref={character} position={[-6, 1.2, -4]}>
          <Character />
        </group>
      </RigidBody>
    </group>
  );
};