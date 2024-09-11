import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Group, Vector3 } from 'three';
import { debounceAndClear } from '../../utils/helper';

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

function TransitionCamera({ transitionPose, onTransitionEnd, transitionDuration } : TransitionCameraProps) {
  const camera = useThree(state => state.camera);
  const sync = useRef<number>(0.0);

  const debounceTransitionEnd = useMemo(() => { return debounceAndClear(onTransitionEnd, transitionDuration); },
    [onTransitionEnd, transitionDuration]);

  useFrame(() => {
    const time = performance.now() - sync.current;
    if (time < transitionDuration) {
      const alpha = time / transitionDuration;
      
      const newPos = new Vector3().lerpVectors(transitionPose.srcPose[0], transitionPose.dstPose[0], alpha);
      const interpolatedDirection = new Vector3().
        lerpVectors(transitionPose.srcPose[1], transitionPose.dstPose[1], alpha); 

      camera.position.copy(newPos);
      camera.lookAt(newPos.add(interpolatedDirection))
    }
  });

  useEffect(() => {
    sync.current = performance.now()
    debounceTransitionEnd.debouncedFunction();

    return () => {
      debounceTransitionEnd.clear();
    }
  }, [debounceTransitionEnd]);

  return <></>;
}

export default TransitionCamera