import { RigidBody } from "@react-three/rapier";

import { GroundProps } from "./entities";

function PlateGround({ position }: GroundProps) {
  
  return (
    <RigidBody colliders='cuboid' type="fixed">
      <mesh
        position={position}
        receiveShadow>
        <boxGeometry args={[3.5, 1, 3.5]}/>
        <meshStandardMaterial color={[0.027, 0.651, 0.345]} />
      </mesh>
    </RigidBody>
  )
}

export default PlateGround;