import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { SceneCheckpointComponent } from '../../data/sceneComponents';

interface CuboidCheckpointProps {
  intersectionHandler: () => void;
  checkpointData: SceneCheckpointComponent;
}

function CuboidCheckpoint({ intersectionHandler, checkpointData }: CuboidCheckpointProps) {
  const {position, rotation, sizeArgs} = checkpointData;
  
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
        onIntersectionEnter={intersectionHandler}
      />
    </RigidBody>
  );
}

export default CuboidCheckpoint;