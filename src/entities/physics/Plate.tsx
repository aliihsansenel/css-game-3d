import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { ScenePlateComponent } from '../../data/sceneComponents'
import PlateMesh from '../../meshes/PlateMesh'
import { useCallback, useEffect, useRef, useState } from 'react';
import { subscribe, unsubscribe } from '../../utils/events';

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
  }, [component.id, notifyController]);
  
  const addOverlappingObject = (item: string) => {
    overlappingObjects.current.add(item);
  };

  const delOverlappingObject = useCallback((item: string) => {
    overlappingObjects.current.delete(item);
  },[]);

  const handleCollapse = useCallback((newIsCollapsed: boolean) => {
    if (!cooldown.current && isCollapsed !== newIsCollapsed) {
      setIsCollapsed(newIsCollapsed);
      notifyHandler(newIsCollapsed);
      cooldown.current = true;
      setTimeout(() => {
        cooldown.current = false;
      }, 100);
    }
  }, [isCollapsed, notifyHandler]);

  const handleOverlappingObjects = useCallback((set: Set<string>) => {
    const arr = [];
    set.forEach(obj => {
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

  const handleDeleteObject = useCallback((event: Event) => {
    const { obj } = (event as CustomEvent).detail;
    delOverlappingObject(obj.name)
    handleOverlappingObjects(overlappingObjects.current);
  }, [delOverlappingObject, handleOverlappingObjects]);

  useEffect(() => {
        
    subscribe('deleteObject', handleDeleteObject);

    return () => {
      unsubscribe('deleteObject', handleDeleteObject);
    };
  
  }, [delOverlappingObject, handleDeleteObject, handleOverlappingObjects])
  
  useEffect(() => {
    const pos = rigidBody.current.translation();
    if (isCollapsed) {
      pos.y = component.position[1] - 0.1;
      rigidBody.current.setNextKinematicTranslation(pos);
    } 
    else {
      const v = component.position;
      rigidBody.current.setNextKinematicTranslation({x: v[0], y: v[1], z: v[2] });
    }
  }, [component.position, isCollapsed])
  

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
        onIntersectionEnter={(payload) => {
          if (payload.other.rigidBodyObject) {
            addOverlappingObject(payload.other.rigidBodyObject.name);
            handleOverlappingObjects(overlappingObjects.current);
          }
        }}
        onIntersectionExit={(payload) => {
          if (payload.other.rigidBodyObject) {
            delOverlappingObject(payload.other.rigidBodyObject.name);
            handleOverlappingObjects(overlappingObjects.current);
          }
        }}
      />
      <PlateMesh isCollapsed={isCollapsed}/>
    </RigidBody>
  )
}

export default Plate