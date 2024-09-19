import { useCallback } from 'react';
import { Vector3 } from 'three';
import { Vector } from 'three/examples/jsm/Addons.js';

function useWaterDrag() {
  const calculateDragForce = useCallback((linvel: Vector3): Vector => {
    const dragCoefficient = .06; // Adjust this coefficient as needed
    const dragForce = linvel.clone().negate().multiplyScalar(dragCoefficient);
    return { x: dragForce.x, y: dragForce.y, z: dragForce.z };
  }, []);

  return { calculateDragForce };
}

export default useWaterDrag;