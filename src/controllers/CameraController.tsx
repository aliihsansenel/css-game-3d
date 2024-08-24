import { createContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Group, Vector3, Euler } from 'three';

interface CameraTargetContextType {
  setCharacter: (target: Group) => void;
  setDisplayScreen: (target: Group | null) => void;
  isCameraToggled: boolean;
  focusScreen: () => void;
}

export const CameraTargetContext = createContext<CameraTargetContextType | null>(null);

function CameraController({children}: { children: React.ReactNode; }) {
  const [cameraTarget, setCameraTarget] = useState<Vector3>(new Vector3())
  const exTargetPos = useRef<Vector3>(new Vector3(0, 0, -1))
  const { camera } = useThree();
  const [isCameraToggled, setCameraToggle] = useState(false);
  const [savedCameraState, setSavedCameraState] = useState<{ 
      position: Vector3, rotation: Euler, target: Vector3 } | null>(null);
  
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
      camera.position.add(worldPosition.clone().sub(exTargetPos.current));
      exTargetPos.current = worldPosition;
      setCameraTarget(worldPosition);
    }
  });

  function focusScreen() {
    // Save the current camera state
    setSavedCameraState({
      position: camera.position.clone(),
      rotation: camera.rotation.clone(),
      target: cameraTarget.clone()
    });
    if (displayScreen.current) {
      const screenPosition = new Vector3();
      displayScreen.current.getWorldPosition(screenPosition);
      camera.position.set(screenPosition.x, screenPosition.y, screenPosition.z + 2.3);
      camera.lookAt(screenPosition);
      setCameraToggle(!isCameraToggled); // Toggle the state
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e' && displayScreen.current) {
        if (!isCameraToggled) {
          focusScreen();
        }
      } else if (event.key === 'Escape' && isCameraToggled) {
        if (savedCameraState) {
          // Restore the saved camera state
          camera.position.copy(savedCameraState.position);
          camera.rotation.copy(savedCameraState.rotation);
          setCameraTarget(savedCameraState.target);
          setCameraToggle(!isCameraToggled); // Toggle the state
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