import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect } from 'react';

import { Group, Quaternion, Vector3 } from 'three';
import { debounce } from '../../utils/helper';


export interface ITransitionPose {
  srcPose: [Vector3, Quaternion];
  dstPose: [Vector3, Quaternion];
}

interface QTransitionCameraProps {
  targetMesh: Group;
  transitionPose: ITransitionPose;
  onTransitionEnd: () => void;
  transitionDuration: number;
}

function QTransitionCamera({ transitionPose, onTransitionEnd, transitionDuration } : QTransitionCameraProps) {
  const camera = useThree(state => state.camera);

  const debounceTransitionEnd = useCallback(
    debounce(onTransitionEnd, transitionDuration), 
  []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (time * 1000 < transitionDuration) {
      const alpha = time * 1000 / transitionDuration;
      const newPos = new Vector3().lerpVectors(transitionPose.srcPose[0], transitionPose.dstPose[0], alpha);
      const quat1 : Quaternion = transitionPose.srcPose[1];
      const quat2 : Quaternion = transitionPose.dstPose[1];

      // Interpolate between the current and target quaternions
      const q = new Quaternion().slerpQuaternions(quat1, quat2, alpha);
      camera.position.copy(newPos);
      camera.quaternion.copy(q);
    }
  });

  useEffect(() => {
    camera.position.copy(transitionPose.dstPose[0]);
    debounceTransitionEnd();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceTransitionEnd]);

  return <></>;
}

export default QTransitionCamera