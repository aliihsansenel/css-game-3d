import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { PlatesStateType } from '../../controllers/StationaryController'
import { ScenePlatformComponent } from '../../data/sceneComponents'
import { useRef } from 'react';
import PlatformMesh from '../../meshes/PlatformMesh';

export interface ComponentProps {
  platesState: PlatesStateType;
}

// TODO move platforms in compliance with active plates
function Platform({ component, platesState } : { component: ScenePlatformComponent } & ComponentProps) {
  // const paths = component.paths;

  const rigidBody = useRef<RapierRigidBody>(null!);

  const activePlateIds = Object.keys(platesState).filter(id => platesState[id]).map(i => Number(i));

  console.log(activePlateIds);
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