import { forwardRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { PlateMeshProps } from '../entities/entities';
import { Mesh } from 'three';

export interface ComponentProps extends PlateMeshProps {
  isCollapsed: boolean;
}

const PlateMesh = forwardRef<Mesh, ComponentProps>((props, ref) => {
  const {args, isCollapsed, ...rest} = props;

  return (
    <RoundedBox
      ref={ref}
      args={args || [2.8, 0.25, 2.8]}
      radius={0.04}
      smoothness={4}
      bevelSegments={1}
      creaseAngle={0.4}
      receiveShadow
      {...rest}
    >
      <meshStandardMaterial
        color={isCollapsed ? "#89ee8b" : "#ddee89"} 
        roughness={0.9}
      />
    </RoundedBox>
  );
});

export default PlateMesh;