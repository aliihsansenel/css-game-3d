import { RigidBody, BallCollider } from '@react-three/rapier';
import { useContext } from 'react';
import { HUDContext } from '../../controllers/HUDController';

interface ScreenSensorProps {
  screenRange: number;
  setDisplayScreen: (isThisScreen: boolean) => void;
}

function ScreenSensor({ screenRange, setDisplayScreen }: ScreenSensorProps) {
  const hudContext = useContext(HUDContext);
  const screenText = hudContext ? hudContext.screenText : () => {};
  const resetText = hudContext ? hudContext.resetText : () => {};

  return (
    <RigidBody 
        colliders={false}
        type="fixed"
    >
      < BallCollider
        args={[screenRange]}
        sensor
        onIntersectionEnter={() => {screenText();setDisplayScreen(true)}}
        onIntersectionExit={() => {resetText();setDisplayScreen(false)}}
      />
    </RigidBody>
  );
}

export default ScreenSensor;