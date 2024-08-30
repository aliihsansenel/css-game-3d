import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBoxMesh"
import { RoundedBoxMeshProps } from "./entities";

function StaticCuboid(props: RoundedBoxMeshProps) {
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