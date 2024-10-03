import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { PlatesStateType } from '../../controllers/StationaryController'
import { ScenePlatformComponent } from '../../data/sceneComponents'
import { useEffect, useMemo, useRef, useState } from 'react';
import PlatformMesh from '../../meshes/PlatformMesh';
import { useFrame } from '@react-three/fiber';

export interface ComponentProps {
  platesState: PlatesStateType;
}

// TODO move platforms in compliance with active plates
function Platform({ component, platesState } : { component: ScenePlatformComponent } & ComponentProps) {
  // const paths = component.paths;
  
  const [route, setRoute] = useState<{ srcIdx: number, dstIdx: number, transitionDuration: number } | { rest: number }>({ rest: 0 });
  const rigidBody = useRef<RapierRigidBody>(null!);
  const sync = useRef<number>(0.0);

  // useFrame(() => {
  //   const time = performance.now() - sync.current;
  //   if (time < transitionDuration) {
  //     const alpha = time / transitionDuration;
      
  //     const newPos = new Vector3().lerpVectors(transitionPose.srcPose[0], transitionPose.dstPose[0], alpha);
  //     const interpolatedDirection = new Vector3().
  //       lerpVectors(transitionPose.srcPose[1], transitionPose.dstPose[1], alpha); 

  //     camera.position.copy(newPos);
  //     camera.lookAt(newPos.add(interpolatedDirection))
  //   }
  // });

  const activePlateIds = useMemo(() => Object.keys(platesState).filter(id => platesState[id]).map(i => Number(i)), [platesState]);

  useEffect(() => {
    // console.log('activePlateIds', activePlateIds);
  }, [activePlateIds])
  
  return (
    <RigidBody type="kinematicPosition" position={component.paths[0].position} ref={rigidBody}
    >
      <CuboidCollider
        args={component.sizeArgs || [1.5, 1.0, 1.5]} 
        restitution={0.1}
       />
      <PlatformMesh />
    </RigidBody>
  )
}

export default Platform