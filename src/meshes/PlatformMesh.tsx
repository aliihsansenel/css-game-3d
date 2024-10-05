import { forwardRef } from 'react';

import { Mesh } from 'three';
import { RoundedBox } from '@react-three/drei';

import { PlatformMeshProps } from '../entities/entities';

export interface ComponentProps extends PlatformMeshProps{
  
}

const PlatformMesh = forwardRef<Mesh, ComponentProps>((props, ref) => {
  const {args, ...rest} = props;

  return (
    <RoundedBox
      ref={ref}
      args={args ? [args[0], args[1], args[2]] : undefined}
      radius={0.05}
      smoothness={4}
      bevelSegments={1}
      creaseAngle={0.4}
      receiveShadow
      castShadow
      {...rest}
    >
      <meshStandardMaterial
        color={"#4788a1"} 
        roughness={0.1}
      />
    </RoundedBox>
  );
});

export default PlatformMesh;
