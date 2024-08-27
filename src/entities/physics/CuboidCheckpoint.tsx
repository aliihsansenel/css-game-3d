import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { SceneCheckpointComponent } from '../../data/sceneComponents';

interface CuboidCheckpointProps {
  intersectionHandler: (checkpointId: string) => void;
  checkpointData: SceneCheckpointComponent;
}

function CuboidCheckpoint({ intersectionHandler, checkpointData }: CuboidCheckpointProps) {
  const {position, rotation, sizeArgs} = checkpointData;
  
  function handleIntersection() {
    intersectionHandler(checkpointData.id);
  }
  return (
    <RigidBody 
        colliders={false}
        type="fixed"
        position={position}
        rotation={rotation}
        
    >
      < CuboidCollider
        args={sizeArgs}
        sensor
        onIntersectionEnter={handleIntersection}
      />
    </RigidBody>
  );
}

export default CuboidCheckpoint;