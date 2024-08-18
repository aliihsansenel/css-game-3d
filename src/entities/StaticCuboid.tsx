import { ThreeElements } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox"

function StaticCuboid(props: ThreeElements['mesh']) {
  const { position, ...rest } = props;
  
  return (
    <group >
      <RigidBody 
        colliders='cuboid' 
        type="fixed"
      >
        <RoundedBoxMesh position={position} {...rest} />
      </RigidBody>
    </group>
    
  )
}

export default StaticCuboid