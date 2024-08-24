import { RigidBody, BallCollider } from '@react-three/rapier';

interface ScreenSensorProps {
  screenRange: number;
  setDisplayScreen: (isThisScreen: boolean) => void;
}

function ScreenSensor({ screenRange, setDisplayScreen }: ScreenSensorProps) {
  return (
    <RigidBody 
        colliders={false}
        type="fixed"
    >
      < BallCollider
        args={[screenRange]}
        sensor
        onIntersectionEnter={() => setDisplayScreen(true)}
        onIntersectionExit={() => setDisplayScreen(false)}
      />
    </RigidBody>
  );
}

export default ScreenSensor;