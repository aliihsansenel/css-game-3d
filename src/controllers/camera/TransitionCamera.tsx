import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect } from 'react';

import { Group, Quaternion, Vector3 } from 'three';
import { debounce } from '../../utils/helper';


export interface ITransitionPose {
  srcPose: [Vector3, Vector3];
  dstPose: [Vector3, Vector3];
}

interface TransitionCameraProps {
  targetMesh: Group;
  transitionPose: ITransitionPose;
  onTransitionEnd: () => void;
  transitionDuration: number;
}

function TransitionCamera({ targetMesh, transitionPose, onTransitionEnd, transitionDuration } : TransitionCameraProps) {
  const camera = useThree(state => state.camera);

  const debounceTransitionEnd = useCallback(
    debounce(onTransitionEnd, transitionDuration), 
  []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (time * 1000 < transitionDuration) {
      const alpha = time * 1000 / transitionDuration;
      const newPos = new Vector3().lerpVectors(transitionPose.srcPose[0], transitionPose.dstPose[0], alpha);
      const interpolatedDirection = new Vector3().
        lerpVectors(transitionPose.srcPose[1], transitionPose.dstPose[1], alpha); 

      camera.position.copy(newPos);
      camera.lookAt(newPos.add(interpolatedDirection))
    }
  });

  useEffect(() => {
    debounceTransitionEnd();
  }, [debounceTransitionEnd]);

  return <></>;
}

export default TransitionCamera