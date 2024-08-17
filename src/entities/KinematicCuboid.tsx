import { forwardRef } from "react";

import { ThreeElements } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../meshes/RoundedBox";
const KinematicCuboid = forwardRef<RapierRigidBody, ThreeElements['mesh']>((props, rigidBodyRef) => {

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