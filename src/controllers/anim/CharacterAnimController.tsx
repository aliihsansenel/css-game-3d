import { useEffect, useContext, useState, useCallback } from 'react';
import { AnimationStateContext } from '../CharacterController';
import { AnimationAction } from 'three';

type AnimAction = AnimationAction | null;
interface IAnimActions { actions: { [key: string]: AnimAction } }

const CharacterAnimController = ({ actions }: IAnimActions) => {
  const animStateContext = useContext(AnimationStateContext);
  const [animState, setAnimState] = useState<{anim: string, vel: number}>({anim: 'Idle', vel: 0}); 

  // Change animation
  const fadeToAction = useCallback((previousName: string, name: string) => {
    const previousAction = ga(actions, previousName);
    const activeAction = ga(actions, name);
  
    previousAction?.fadeOut(0.1);
  
    activeAction?.reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(0.1)
      .play();
  }, [actions]);

  // Set animation time scale (speed)
  const animTimeScale = useCallback(( name: string, timeScale: number) => {
    const activeAction = ga(actions, name);
    activeAction?.setEffectiveTimeScale(timeScale);
  }, [actions]);

  // Parents call this function to update animation state
  const animHandler = useCallback((anim: string, vel: number): void => {
    if(animState.anim !== anim){
      setAnimState({anim: anim, vel: vel});
      fadeToAction(animState.anim, anim);
    }
    else {
      setAnimState(oldState => ({anim: oldState.anim, vel: vel}));
      if(animState.anim === 'Walking'){
        const lerp = (Math.min(Math.max(animState.vel, 0), 0.33) / 0.33) * 1.0;
        animTimeScale(animState.anim, lerp);
      }
      
    }
  }, [animState.anim, fadeToAction]);

  // Idle at scene creation
  useEffect(() => {
    fadeToAction('Idle', 'Idle');
  }, [fadeToAction]);

  // Set parent's callback instance
  useEffect(() => {
    if (animStateContext)
      animStateContext.current = animHandler;
  }, [animHandler, animStateContext]);

  return (
    <>
    </>
  );
};

export default CharacterAnimController;

// Generate valid animation name
function gn(str: string): string {
  return `RobotArmature|Robot_${str}`;
}

// Sort out corresponding AnimationAction
function ga(actions: IAnimActions['actions'], anim: string): AnimAction {
  return actions ? actions[gn(anim)] : null;
}