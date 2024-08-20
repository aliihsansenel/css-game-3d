import { RigidBody } from "@react-three/rapier";

import GroundMesh from "../meshes/Ground";
import { GroundProps } from "./entities";

function Ground({ position }: GroundProps) {
  
  return (
    <RigidBody colliders='cuboid' type="fixed">
      <GroundMesh position={position} />
    </RigidBody>
  )
}

export default Ground;