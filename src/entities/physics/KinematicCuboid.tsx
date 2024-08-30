import { forwardRef } from "react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../../meshes/RoundedBoxMesh";
import { RoundedBoxMeshProps } from "../entities";

const KinematicCuboid = forwardRef<RapierRigidBody, RoundedBoxMeshProps>((props, rigidBodyRef) => {

  return (
    <RigidBody ref={rigidBodyRef}
      colliders='cuboid' 
      type="kinematicPosition"
    >
      <RoundedBoxMesh {...props} visible={false} />
    </RigidBody>
  )
});

export default KinematicCuboid