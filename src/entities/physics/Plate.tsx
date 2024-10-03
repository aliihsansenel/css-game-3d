import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { ScenePlateComponent } from '../../data/sceneComponents'
import PlateMesh from '../../meshes/PlateMesh'
import { useCallback, useEffect, useRef, useState } from 'react';
import { subscribe } from '../../utils/events';

export interface ComponentProps {
  notifyController: (id: number, isCollapsed: boolean) => void;
}

function Plate({ component, notifyController } : { component: ScenePlateComponent } & ComponentProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const rigidBody = useRef<RapierRigidBody>(null!);
  const cooldown = useRef<boolean>(false);
  const overlappingObjects = useRef<Set<string>>(new Set());
  
  const notifyHandler = useCallback((isCollapsed: boolean) => {
    notifyController(component.id, isCollapsed);
  }, []);

  const handleCollapse = useCallback((isCollapsed: boolean) => {
    if (!cooldown.current) {
      setIsCollapsed(isCollapsed);
      notifyHandler(isCollapsed);
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, 100);
    }
  }, []);

  const handleOverlappingObjects = useCallback(() => {
    const arr = [];
    overlappingObjects.current.forEach(obj => {
      if (obj.startsWith('pickable') || obj.startsWith('character')) {
        // Perform your desired operation here, e.g., logging or processing
        arr.push(obj);
      }
    });
    if (arr.length > 0) {
      handleCollapse(true);
    } else {
      handleCollapse(false);
    }
    
  }, [handleCollapse]);

  useEffect(() => {
        
    subscribe('deleteObject', (event) => {
      const { obj } = (event as CustomEvent).detail;
      overlappingObjects.current.delete(obj.name)
      handleOverlappingObjects();
    });
  
  }, [handleOverlappingObjects])
  

  useEffect(() => {
    // console.log('ue', isCollapsed);
    const pos = rigidBody.current.translation();
    if (isCollapsed) {
      pos.y = component.position[1] - 0.1;
      rigidBody.current.setNextKinematicTranslation(pos);
    } 
    else {
      const v = component.position;
      rigidBody.current.setNextKinematicTranslation({x: v[0], y: v[1], z: v[2] });
    }
  }, [isCollapsed])
  

  return (
    <RigidBody type="kinematicPosition" position={component.position} ref={rigidBody}
    >
      <CuboidCollider
        position={[0, 0.1, 0]}
        args={[1.4, 0.03, 1.4]} 
        restitution={0.1}
       />
       <CuboidCollider
        position={[0, 0.2, 0]}
        args={[1.4, 0.1, 1.4]} 
        sensor
        // onIntersectionEnter={(payload) => overlappingObjects.current.add(payload.rigidBody.name)}
        onIntersectionEnter={(payload) => {
          if (payload.other.rigidBodyObject) {
            overlappingObjects.current.add(payload.other.rigidBodyObject.name)
            handleOverlappingObjects();
          }
        }}
        onIntersectionExit={(payload) => {
          if (payload.other.rigidBodyObject) {
            overlappingObjects.current.delete(payload.other.rigidBodyObject.name)
            handleOverlappingObjects();
          }
        }}
      />
      <PlateMesh isCollapsed={isCollapsed}/>
    </RigidBody>
  )
}

export default Plate