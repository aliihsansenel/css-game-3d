import { useFrame, useThree } from '@react-three/fiber';

import { Group, Vector3 } from 'three';

interface TrackingCameraProps {
  targetMesh: Group;
}

function TrackingCamera({ targetMesh } : TrackingCameraProps) {
  const camera = useThree(state => state.camera);

  useFrame(() => {
    const worldPosition = new Vector3();
    targetMesh.getWorldPosition(worldPosition);
    camera.lookAt(worldPosition.add(new Vector3(0,2.0,0)));
  });

  return <></>;
}

export default TrackingCamera