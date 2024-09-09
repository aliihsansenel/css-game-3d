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
    camera.lookAt(worldPosition);
  });

  return <></>;
}

export default TrackingCamera