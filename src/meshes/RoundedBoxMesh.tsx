import { forwardRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { RoundedBoxMeshProps } from '../entities/entities';
import { Mesh } from 'three';

const RoundedBoxMesh = forwardRef<Mesh, RoundedBoxMeshProps>((props, ref) => {
  const color = props.color || "#f3f3f3";
  const {args, visible, ...rest} = props;

  return (
    <RoundedBox
      ref={ref}
      args={args || [1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
      radius={0.05} // Radius of the rounded corners. Default is 0.05
      smoothness={4} // The number of curve segments. Default is 4
      bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
      creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      castShadow
      receiveShadow
      {...rest} // All THREE.Mesh props are valid
    >
      <meshStandardMaterial
        color={color} 
        roughness={0.5} 
        transparent={visible === false} 
        opacity={visible === false ? 0.0 : 1.0} 
      />
    </RoundedBox>
  );
});

export default RoundedBoxMesh;
