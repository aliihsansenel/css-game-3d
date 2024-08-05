import { Html, Plane, RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useState } from "react";

export const DisplayScreen = () => {
  const [hidden, set] = useState();

  const width = 4.5;
  const heigth = 2.5;

  return (
    <group position={[-5, 2.5, -4]}>
      <RigidBody
        colliders={false}
        type="fixed"
      >
      <RoundedBox args={[width, heigth, 0.1]}>
        <meshBasicMaterial color="black" />
        <Plane args={[width - 0.3, heigth - 0.3]} position={[0, 0, .11]}>
        <meshBasicMaterial color="white" />
          <Html position={[0, 0, 0.111]}
            transform
            occlude 
            onOcclude={set}
            style={{
              transition: 'all 0.5s',
              opacity: hidden ? 0 : 1,
            }} >
            <div>
              <h1 style={{ color: "red", fontSize: "20px" }}>HELLO</h1>
            </div>
          </Html>
        </Plane>
      </RoundedBox>
      <CuboidCollider args={[width / 2.0, heigth / 2.0, 0.1]} />
    </RigidBody>
      
    </group>
  );
}

