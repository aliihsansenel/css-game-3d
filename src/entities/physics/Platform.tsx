import { useEffect, useMemo, useRef, useState } from 'react';

import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ScenePlatformComponent } from '../../data/sceneComponents'
import { PlatesStateType } from '../../controllers/StationaryController'
import PlatformMesh from '../../meshes/PlatformMesh';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

export interface ComponentProps {
  platesState: PlatesStateType;
}

function Platform({ component, platesState } : { component: ScenePlatformComponent } & ComponentProps) {
  const paths = component.paths;
  
  const [route, setRoute] = useState<
    { curPos: Vector3, dstPos: Vector3, dstIdx: number, transitionDuration: number } | 
    { rest: number }>({ rest: 0 });
  const rigidBody = useRef<RapierRigidBody>(null!);
  const sync = useRef<number>(0.0);

  useFrame(() => {
    if ('rest' in route)
      return;
    const time = performance.now() - sync.current;
    if (time < route.transitionDuration) {
      const alpha = time / route.transitionDuration;
      
      const newPos = new Vector3().lerpVectors(route.curPos, route.dstPos, alpha);
      rigidBody.current.setNextKinematicTranslation(newPos);
    } else {
      setRoute({rest: route.dstIdx });
    }
  });

  const activePlateIds = useMemo(() => Object.keys(platesState).filter(id => platesState[id]).map(i => Number(i)), [platesState]);

  useEffect(() => {
    for (const path of paths) {
      const targetPath = path.reducer(activePlateIds);
      if (targetPath) {
        if('dstIdx' in route ? route.dstIdx === path.id : 'rest' in route && route.rest === path.id) {
          continue;
        }
        const sv = rigidBody.current.translation();
        const dv = path.position;
        const curPos = new Vector3(sv.x, sv.y, sv.z);
        const dstPos = new Vector3(dv[0], dv[1], dv[2]);
        const dist = curPos.distanceTo(dstPos);
        setRoute({curPos: curPos, dstPos: dstPos, dstIdx: path.id, transitionDuration: dist * 1000 * 0.6});
        sync.current = performance.now();
      }
    }
  }, [activePlateIds, paths]);
  
  const sizeArgs = component.sizeArgs ? 
    [component.sizeArgs[0] / 2.0, component.sizeArgs[1] / 2.0, component.sizeArgs[2] / 2.0] : null;

  return (
    <RigidBody type="kinematicPosition" position={component.paths[0].position} ref={rigidBody}
    >
      <CuboidCollider
        args={sizeArgs ? sizeArgs as [number, number, number] : [0.75, 0.5, 0.375]}
        restitution={0.1}
       />
      <PlatformMesh args={component.sizeArgs}/>
    </RigidBody>
  )
}

export default Platform