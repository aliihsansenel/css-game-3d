import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { Group, Vector3 } from 'three';

interface OrbitalCameraProps {
  targetMesh: Group;
}

function OrbitalCamera({ targetMesh } : OrbitalCameraProps) {
  const camera = useThree(state => state.camera);
  let worldPosition = new Vector3();
  worldPosition = targetMesh.getWorldPosition(worldPosition).clone().add(new Vector3(0, 3.5 / 2.0, 0));
  const [cameraTarget, setCameraTarget] = useState<Vector3>(worldPosition);
  const exTargetPos = useRef<Vector3>(worldPosition);

  useFrame(() => {
    let worldPosition = new Vector3();
    worldPosition = targetMesh.getWorldPosition(worldPosition).clone().add(new Vector3(0, 3.5 / 2.0, 0));
    // console.log(worldPosition)
    const delta = worldPosition.clone().sub(exTargetPos.current);
    camera.position.add(delta);
    exTargetPos.current = worldPosition;
    setCameraTarget(worldPosition);
  });

  return (
    <OrbitControls
      maxPolarAngle={1.6}
      enablePan={false}
      enableZoom={false}
      target={cameraTarget}
      rotateSpeed={0.5}
    />
  )
}

export default OrbitalCamera