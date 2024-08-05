import { createContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3 } from 'three';

export interface CameraTargetDispatcher {
  (target: Group): void;
}

export const CameraTargetContext = createContext<CameraTargetDispatcher | null>(null);

function CameraController({children}: { children: React.ReactNode; }) {
  const [cameraTarget, setCameraTarget] = useState<Vector3>(new Vector3())
  const exTargetPos = useRef<Vector3>(new Vector3(0, 0, -1))
  const { camera } = useThree();
  const [isCameraToggled, setCameraToggle] = useState(true);
  
  const character = useRef<Group | null>(null);
  
  function setCharacter(target: Group) {
    character.current = target;
  }

  useFrame(() => {
    if (character.current) {
      const worldPosition = new Vector3();
      character.current.getWorldPosition(worldPosition);
      camera.position.add(worldPosition.clone().sub(exTargetPos.current));
      exTargetPos.current = worldPosition;
      setCameraTarget(worldPosition);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e') {
        setCameraToggle(!isCameraToggled); // Toggle the state
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, isCameraToggled]);


  return (
    <CameraTargetContext.Provider value={setCharacter}>
      {children}
      {isCameraToggled && 
        <OrbitControls
          maxPolarAngle={1.2}
          enablePan={false}
          enableZoom={false}
          target={cameraTarget}
        /> }
    </CameraTargetContext.Provider>
  )
}

export default CameraController