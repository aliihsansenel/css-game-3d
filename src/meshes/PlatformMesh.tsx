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
      args={args || [1.5, 1.0, 1.5]}
      radius={0.05}
      smoothness={4}
      bevelSegments={1}
      creaseAngle={0.4}
      receiveShadow
      castShadow
      {...rest}
    >
      <meshStandardMaterial
        color={"#6692a3"} 
        roughness={0.0}
      />
    </RoundedBox>
  );
});

export default PlatformMesh;
