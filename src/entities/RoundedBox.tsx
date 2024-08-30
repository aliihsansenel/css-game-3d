import { RigidBody } from "@react-three/rapier";
import RoundedBoxMesh from "../meshes/RoundedBoxMesh";
import { RoundedBoxMeshProps } from "./entities";

function RoundedBox(props: RoundedBoxMeshProps) {
  
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