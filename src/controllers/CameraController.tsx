import { createContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3 } from 'three';

interface CameraTargetContextType {
  setCharacter: (target: Group) => void;
  setDisplayScreen: (target: Group | null) => void;
  isCameraToggled: boolean;
  focusScreen: () => void;
}

export const CameraTargetContext = createContext<CameraTargetContextType | null>(null);

function CameraController({spawnPoint, children}: {spawnPoint: Vector3, children: React.ReactNode; }) {
  const [cameraTarget, setCameraTarget] = useState<Vector3>(spawnPoint)
  const exTargetPos = useRef<Vector3>(spawnPoint.add(new Vector3(0, 0, -1)));
  const { camera } = useThree();
  const [isCameraToggled, setCameraToggle] = useState(false);
  const savedCameraState = useRef<{ position: Vector3, target: Vector3 } | null>(null);
  
  const character = useRef<Group | null>(null);
  const displayScreen = useRef<Group | null>(null);
  
  function setCharacter(target: Group) {
    character.current = target;
  }

  function setDisplayScreen(target: Group | null) {
    displayScreen.current = target;
  }

  useFrame(() => {
    if (!isCameraToggled && character.current) {
      const worldPosition = new Vector3();
      character.current.getWorldPosition(worldPosition);
      const delta = worldPosition.clone().sub(exTargetPos.current);
      camera.position.add(delta);
      exTargetPos.current = worldPosition;
      setCameraTarget(worldPosition);
    }
  });

  function focusScreen() {
    if (displayScreen.current) {
      setCameraToggle(true);
    }
  }

  useEffect(() => {
    if (displayScreen.current && isCameraToggled) {
      const screenPosition = new Vector3();
      displayScreen.current.getWorldPosition(screenPosition);

      // Save the current camera state
      savedCameraState.current = {
        position: camera.position.clone(),
        target: cameraTarget.clone()
      };
      camera.position.set(screenPosition.x, screenPosition.y, screenPosition.z + 2.3);
      camera.lookAt(screenPosition);
      camera.updateProjectionMatrix();
    }
  }, [isCameraToggled])
  

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e' && displayScreen.current) {
        if (!isCameraToggled) {
          focusScreen();
        }
      } else if (event.key === 'Escape' && isCameraToggled) {
        if (savedCameraState) {
          // Restore the saved camera state
          camera.position.copy(savedCameraState.current!.position);
          camera.updateProjectionMatrix();
          setCameraTarget(savedCameraState.current!.target);
          setCameraToggle(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCameraToggled]);
  
  return (
    <CameraTargetContext.Provider value={{ 
        setCharacter, setDisplayScreen, isCameraToggled, focusScreen
      }}>
      {children}
      {!isCameraToggled && 
        <OrbitControls
          maxPolarAngle={1.2}
          enablePan={false}
          enableZoom={false}
          target={cameraTarget}
          rotateSpeed={0.5}
        /> }
    </CameraTargetContext.Provider>
  )
}

export default CameraController