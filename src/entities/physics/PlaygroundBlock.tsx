import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../../meshes/RoundedBoxMesh"
import { StaticCuboidProps } from "../entities";

function PlaygroundBlock(props: StaticCuboidProps) {
  const { position, ...rest } = props;
  
  return (
    <group >
      <RigidBody 
        colliders='cuboid' 
        type="fixed"
      >
        <RoundedBoxMesh
          renderOrder={2}
          position={position}
          visible={true}
          {...rest}
        />
      </RigidBody>
    </group>
    
  )
}

export default PlaygroundBlock