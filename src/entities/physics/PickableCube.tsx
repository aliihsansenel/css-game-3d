import { RigidBody } from "@react-three/rapier";

import RoundedBoxMesh from "../../meshes/RoundedBoxMesh";
import { ILevelPickableComponent, ScenePickableCubeComponent } from "../../data/sceneComponents";
import { RoundedBoxMeshProps } from "../entities";
import { subscribe } from "../../utils/events";
import { useEffect, useState } from "react";
import { Vector3Tuple } from "three";

interface PickableCubeProps {
  color : RoundedBoxMeshProps["color"];
  component: ScenePickableCubeComponent;
  physicsType: ILevelPickableComponent['physicsType'];
}

interface ObjectState {
  position?: Vector3Tuple;
  rotation?: Vector3Tuple;
  physicsType: ILevelPickableComponent['physicsType'];
}

function PickableCube({color, component, physicsType}: PickableCubeProps) {
  const [objectState, setObjectState] = useState<ObjectState | null>({
    position: component.position,
    rotation: component.rotation || [0, 0, 0],
    physicsType: physicsType,
  });

  const meshName = 'pickableCube-' + component.id;

  useEffect(() => {
    subscribe('deleteObject', (event) => {
      const { obj } = (event as CustomEvent).detail;
      if (obj.name === meshName) {
        setObjectState(null);
      }
    });

    subscribe('spawnObject', (event) => {
      const { comp } = (event as CustomEvent).detail;
      if (comp.id === component.id) {
        setObjectState({position: comp.position, rotation: comp.rotation, physicsType: 'dynamic'});
      }
    });
  
    // return () => {
    //   
    // }
  }, [meshName, component])
  
  const cubeMesh = <RoundedBoxMesh color={color} name={meshName} material-roughness={.2} />;

  return (
    <>
      {objectState && (
        <group position={objectState.position} rotation={objectState.rotation}>
          {physicsType === 'dynamic' ? (
            <RigidBody 
              colliders='cuboid' 
              type="dynamic" 
              restitution={0.1} 
              friction={0.8}
              density={4.0}
              name={meshName}
            >
              {cubeMesh}
            </RigidBody>
          ): (
            <>{cubeMesh}</>
          )}
        </group>
      )}
    </>
  )
}

export default PickableCube