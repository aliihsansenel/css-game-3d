import { RigidBody, BallCollider } from '@react-three/rapier';

interface SphereSensorProps {
  screenRange: number;
  setDisplayScreen: (isThisScreen: boolean) => void;
}

function SphereSensor({ screenRange, setDisplayScreen }: SphereSensorProps) {
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

export default SphereSensor;