import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../../meshes/RoundedBoxMesh";
import { ScenePickableCubeComponent } from "../../data/sceneComponents";
import { RoundedBoxMeshProps } from "../entities";
import { subscribe } from "../../utils/events";
import { useEffect, useState } from "react";

interface PickableCubeProps {
  color : RoundedBoxMeshProps["color"];
  component: ScenePickableCubeComponent;
}

function PickableCube({color, component}: PickableCubeProps) {
  const [exist, setExist] = useState(true);

  const meshName = 'pickableCube-' + component.id;

  useEffect(() => {
    subscribe('removeObject', (event) => {
      const objName = (event as CustomEvent).detail.objectName;

      if (objName === meshName) {
        setExist(false);
      }
    });
  
    // return () => {
    //   
    // }
  }, [component])
  
  
  return (
    <>
      {exist && (
        <group position={component.position} rotation={component.rotation}>
          <RigidBody 
            colliders='cuboid' 
            type="dynamic" 
            restitution={0.2} 
            friction={0.6}
          >
            <RoundedBoxMesh color={color} name={meshName} material-roughness={.2} />
          </RigidBody>
        </group>
      )}
    </>
  )
}

export default PickableCube