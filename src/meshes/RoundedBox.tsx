import { forwardRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';

interface RoundedBoxMeshProps extends MeshProps {
  color?: string; // Optional color property
}

const RoundedBoxMesh = forwardRef<RoundedBoxMeshProps>((props, ref?) => {
  const color: string = props.color ? props.color : "#f3f3f3";
  return (
    <RoundedBox
      ref={ref}
      args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
      radius={0.05} // Radius of the rounded corners. Default is 0.05
      smoothness={4} // The number of curve segments. Default is 4
      bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
      creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      {...props} // All THREE.Mesh props are valid
    >
      <meshStandardMaterial color={color} roughness={0.5} />
    </RoundedBox>
  );
});

export default RoundedBoxMesh;
