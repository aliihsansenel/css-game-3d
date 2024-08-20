import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox"
import { StaticCuboidProps } from "./entities";

function PlaygroundBlock(props: StaticCuboidProps) {
  const { position, ...rest } = props;
  
  return (
    <group >
      <RigidBody 
        colliders='cuboid' 
        type="fixed"
      >
        <RoundedBoxMesh position={position} {...rest} material-transparent material-opacity={0.0} />
      </RigidBody>
    </group>
    
  )
}

export default PlaygroundBlock