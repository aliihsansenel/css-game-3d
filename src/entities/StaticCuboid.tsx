import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox"
import { StaticCuboidProps } from "./entities";

function StaticCuboid(props: StaticCuboidProps) {
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