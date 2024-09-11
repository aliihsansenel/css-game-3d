/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import OrbitalCamera from './camera/OrbitalCamera';
import TrackingCamera from './camera/TrackingCamera';
import TransitionCamera, { ITransitionPose } from './camera/TransitionCamera';
import { Sequence } from '../hooks/useCheckpoint';
import {screenFocusInVectors, screenFocusOutVectors, spawnTransitionVectors } from '../utils/vectors';

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
    mode: CameraModes,
    transitionDuration: number,
  };
  focusScreen: () => void;
}

export const CameraTargetContext = createContext<CameraTargetContextType | null>(null);

interface CameraControllerProps {
  sceneInstance: number;
  sequence: Sequence;
  spawnPoint: Vector3;
  children: React.ReactNode;
}

function CameraController({ sceneInstance, sequence, spawnPoint, children }: CameraControllerProps) {
  const camera = useThree(state => state.camera);
  
  const [cameraStatus, setCameraStatus] = useState<CameraTargetContextType["cameraStatus"]>({
    state: CameraStates.None,
    mode: CameraModes.None,
    transitionDuration: 2000
  });

  const [character, setCharacter] = useState<Group | null>(null);
  const savedCameraState = useRef<{ position: Vector3, direction: Vector3  } | null>(null);
  const transitionPose = useRef<ITransitionPose | null>(null);
  const orbitalControlsInstance = useRef<number>(0);
  
  const displayScreen = useRef<Group | null>(null);

  function setDisplayScreen(target: Group | null) {
    displayScreen.current = target;
  }

  function focusScreen() {
      const screen = displayScreen.current;
      if (screen ) {
        savedCameraState.current = {
          position: camera.position.clone(),
          direction: camera.getWorldDirection(new Vector3()).normalize(),
        };
        orbitalControlsInstance.current += 1;
        transitionPose.current = screenFocusInVectors(screen, camera);

        setCameraStatus(() => ({transitionDuration: 700, state: CameraStates.Transition, mode: CameraModes.ScreenFocus }));
    }
  }

  function blurScreen() {
    transitionPose.current = screenFocusOutVectors(savedCameraState.current!, camera);

    setCameraStatus(() => ({transitionDuration: 700, state: CameraStates.Transition, mode: CameraModes.Orbital }));
  }

  useFrame(() => {
    if (character) {
      const characterPos = new Vector3();
      character.getWorldPosition(characterPos);

      if (characterPos.y < -0.2)
        setCameraStatus(() => ({transitionDuration: 1500, state: CameraStates.OnTarget, mode: CameraModes.Tracking }));
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e' && displayScreen.current) {
        if (cameraStatus.mode === CameraModes.Orbital && cameraStatus.state === CameraStates.OnTarget) {
          focusScreen();
        }
      } else if (event.key === 'Escape' && cameraStatus.mode === CameraModes.ScreenFocus) {
        if (savedCameraState.current) {
          blurScreen();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cameraStatus]);

  useEffect(() => {
    
  }, [sceneInstance])
  

  useEffect(() => {
    if (character) {
      transitionPose.current = spawnTransitionVectors(character, camera, sequence);
      setCameraStatus((state) => ({...state, mode: CameraModes.Orbital, state: CameraStates.Transition }));
    }
  }, [character])
  
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
              setCameraStatus((state) => ({...state, state: CameraStates.OnTarget }));
            }}
            transitionDuration={cameraStatus.transitionDuration}
          />
        }
        {cameraStatus.mode === CameraModes.Tracking && character &&
          <TrackingCamera
            targetMesh={character}
          />
        }
        {cameraStatus.state === CameraStates.OnTarget && 
          cameraStatus.mode === CameraModes.Orbital &&
          character &&
          [0].map(() => <OrbitalCamera key={sceneInstance + orbitalControlsInstance.current} targetMesh={character} />)
        }
      </CameraTargetContext.Provider>
    </>
  )
}

export default CameraController