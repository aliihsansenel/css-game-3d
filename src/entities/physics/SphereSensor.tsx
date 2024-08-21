import React from 'react';
import { Sphere } from '@react-three/drei';
import { RigidBody, BallCollider } from '@react-three/rapier'; // Importing RigidBody and CuboidCollider
import { Level } from '../../data/levels';

interface SphereSensorProps {
  setLevel: React.Dispatch<React.SetStateAction<Level>>;
}

function SphereSensor({ setLevel }: SphereSensorProps) {
  return (
    <RigidBody 
        colliders={false}
        type="fixed"
        position={[-5,2,0]}
    >
      <Sphere>
        <meshBasicMaterial color="hotpink" />
      </Sphere>
      < BallCollider
        args={[1]}
        sensor
        onIntersectionEnter={() => setLevel(level => {
          const newLevel = level.levelCode === 'l0' ? level.nextLevel(): level.prevLevel();
          return newLevel
        })}
      />
    </RigidBody>
  );
}

export default SphereSensor;