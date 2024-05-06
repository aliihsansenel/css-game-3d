import { ThreeElements } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox"

function RoundedBox(props: ThreeElements['mesh']) {
  
  return (
    <RigidBody 
      colliders='cuboid' 
      type="dynamic" 
      restitution={0.2} 
      friction={0.6}
    >
      <RoundedBoxMesh {...props} />
    </RigidBody>
    
  )
}

export default RoundedBox