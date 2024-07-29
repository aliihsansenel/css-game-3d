import { ThreeElements } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox"

function StaticCuboid(props: ThreeElements['mesh']) {
  
  return (
    <RigidBody 
      colliders='cuboid' 
      type="fixed"
    >
      <RoundedBoxMesh {...props} />
    </RigidBody>
    
  )
}

export default StaticCuboid