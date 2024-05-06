import { Vector3 } from "@react-three/fiber";
import GroundMesh from "../meshes/Ground";

import { RigidBody } from "@react-three/rapier";

function Ground({ position }: { position: Vector3 }) {
  
  return (
    <RigidBody colliders='cuboid' type="fixed">
      <GroundMesh position={position} />
    </RigidBody>
  )
}

export default Ground;