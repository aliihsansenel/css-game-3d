/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { Euler, Group, Quaternion, Vector3 } from 'three';
import OrbitalCamera from './camera/OrbitalCamera';
import TrackingCamera from './camera/TrackingCamera';
import { debounce } from '../utils/helper';
import { PerspectiveCamera } from '@react-three/drei';
import TransitionCamera, { ITransitionPose } from './camera/TransitionCamera';

export const enum CameraStates {
  None,
  Transition,
  OnTarget
}

export const enum CameraModes {
  None,
  Tracking,
  Orbital,
  ScreenFocus,
}

interface CameraTargetContextType {
  setCharacter: (target: Group) => void;
  setDisplayScreen: (target: Group | null) => void;
  cameraStatus: {
    state: CameraStates
    mode: CameraModes
  };
  focusScreen: () => void;
}

export const CameraTargetContext = createContext<CameraTargetContextType | null>(null);

interface CameraControllerProps {
  sceneInstance: number;
  spawnPoint: Vector3;
  children: React.ReactNode;
}

function CameraController({ sceneInstance, spawnPoint, children }: CameraControllerProps) {
  const camera = useThree(state => state.camera);
  
  const [cameraStatus, setCameraStatus] = useState<CameraTargetContextType["cameraStatus"]>({
    state: CameraStates.None,
    mode: CameraModes.None,
  });

  const [character, setCharacter] = useState<Group | null>(null);
  const savedCameraState = useRef<{ position: Vector3 } | null>(null);
  const transitionPose = useRef<ITransitionPose | null>(null);
  
  const displayScreen = useRef<Group | null>(null);

  function setDisplayScreen(target: Group | null) {
    displayScreen.current = target;
  }

  function focusScreen() {
    if (displayScreen.current) {
      setCameraStatus(() => ({state: CameraStates.Transition, mode: CameraModes.ScreenFocus }));
    }
  }

  useFrame(() => {
    if (character) {
      const characterPos = new Vector3();
      character.getWorldPosition(characterPos);

      if (characterPos.y < -0.2)
        setCameraStatus(() => ({state: CameraStates.OnTarget, mode: CameraModes.Tracking }));
    }
  });

  // const debounceCameraCorrect = useCallback(
  //   debounce(() => 
  //     setCameraStatus(() => ({state: CameraStates.Transition, mode: CameraModes.Orbital })), 1000), 
  // []);

  // useEffect(() => {
  //   console.log(camera.position)
  //   if (displayScreen.current && cameraStatus.mode === CameraModes.None && cameraStatus.state === CameraStates.None) {
  //     const screenPosition = new Vector3();
  //     displayScreen.current.getWorldPosition(screenPosition);

  //     // Save the current camera state
  //     savedCameraState.current = {
  //       position: camera.position.clone(),
  //     };
  //     camera.position.set(screenPosition.x, screenPosition.y, screenPosition.z + 2.3);
  //     camera.lookAt(screenPosition);
  //     camera.updateProjectionMatrix();
  //   } else if (cameraStatus.mode === CameraModes.None && cameraStatus.state === CameraStates.None) {
  //     // Restore the saved camera state
  //     const characterPos = new Vector3();
  //     character!.getWorldPosition(characterPos);
  //     camera.position.copy(characterPos.clone().add(new Vector3(0, 2.5, 5)));
  //     debounceCameraCorrect();
  //   }
  // }, [cameraStatus.mode])


  // useEffect(() => {
  //   if (cameraStatus.mode === CameraModes.None && cameraStatus.state === CameraStates.None) {
  //     const vec = spawnPoint.clone().add(new Vector3(0, 2.5, 5));
  //     camera.position.copy(vec);
  //     setCameraStatus(() => ({state: CameraStates.OnTarget, mode: CameraModes.Tracking }));
  //   }
  // }, [character])

  // useEffect(() => {
  //   if (cameraStatus.mode === CameraModes.None && cameraStatus.state === CameraStates.None) {
  //     camera.position.copy(spawnPoint.clone().add(new Vector3(0, 2.5, 5)));
  //     setCameraStatus(() => ({state: CameraStates.OnTarget, mode: CameraModes.Tracking }));
  //   }
  // }, [sceneInstance])

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e' && displayScreen.current) {
        if (cameraStatus.mode === CameraModes.Orbital && cameraStatus.state === CameraStates.OnTarget) {
          focusScreen();
        }
      } else if (event.key === 'Escape' && cameraStatus.mode === CameraModes.ScreenFocus) {
        if (savedCameraState) {
          setCameraStatus(() => ({state: CameraStates.Transition, mode: CameraModes.Orbital }));
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cameraStatus]);

  useEffect(() => {
    if (character) {
      let characterPos = new Vector3();
      characterPos = character.getWorldPosition(characterPos).add(new Vector3(0, 2.5, 0));
      const initialPos = characterPos.clone().add(new Vector3(0, 0, 5));
      const targetPos = characterPos.clone().add(new Vector3(-5, 1.5, 0));
      const currentDirection = characterPos.clone().sub(initialPos).normalize();
      const targetDirection = characterPos.clone().sub(targetPos).normalize();
      camera.position.copy(initialPos);
      camera.lookAt(characterPos)

      transitionPose.current = {srcPose: [initialPos, currentDirection], dstPose: [targetPos, targetDirection]}
      
      setCameraStatus((state) => ({...state, state: CameraStates.Transition }));
    }
  }, [character])
  
  // const PerspectiveCameraMemo = React.memo(() => <PerspectiveCamera position={[0, 0, 10]} makeDefault />);
  return (
    <>
      {/* <PerspectiveCameraMemo /> */}
      <CameraTargetContext.Provider value={{ 
          setCharacter, setDisplayScreen, cameraStatus, focusScreen
        }}>
        {children}
        {cameraStatus.state === CameraStates.Transition &&
          character &&
          <TransitionCamera
            transitionPose={transitionPose.current!}
            targetMesh={character}
            onTransitionEnd={() => {
              setCameraStatus(() => ({mode: CameraModes.Orbital, state: CameraStates.OnTarget }));
            }}
            transitionDuration={2000}
          />
        }
        {/* {cameraStatus.mode === CameraModes.Tracking && character &&
          <TrackingCamera
            targetMesh={character}
          />
        } */}
        {cameraStatus.state === CameraStates.OnTarget && 
          cameraStatus.mode === CameraModes.Orbital &&
          character &&
          [0].map(() => <OrbitalCamera key={sceneInstance} targetMesh={character} />)
        }
      </CameraTargetContext.Provider>
    </>
  )
}

export default CameraController