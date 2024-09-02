import { useEffect, useRef } from "react"

import vertexWater from "../shaders/vertex/water.glsl";
import fragmentWater from "../shaders/fragment/water.glsl";
import { Group, PlaneGeometry } from "three";
import { WaterProps } from "../entities/entities";

function Water(props: WaterProps) {
  const groupRef = useRef<Group>(null!);
  const waterGeomRef = useRef<PlaneGeometry>(null!);

  const width = 20;
  const height = 20;
  const sf = 3;

  useEffect(() => {
    if (waterGeomRef.current) {
      const bufferGeom = waterGeomRef.current;
      const ripplettribute = bufferGeom.getAttribute('ripple');
      for ( let i = 0; i < ripplettribute.count; i+= 1 ) {
        ripplettribute.setXY( i, 1.0, 1.0);
      }
      ripplettribute.needsUpdate = true;
    }
  }, [waterGeomRef])
  
  return (
    <group {...props}
      rotation={[-Math.PI / 2.0, 0, 0]}
      ref={groupRef}
    >
      <mesh>
        <planeGeometry ref={waterGeomRef} args={[width, height, width * sf, height * sf]} >
          <float32BufferAttribute attach='attributes-ripple' 
            args={[ 
              new Float32Array((width * sf + 1) * (height * sf + 1) * 2), 2]}>
          </float32BufferAttribute>
        </planeGeometry>
        <shaderMaterial 
          vertexShader={vertexWater} 
          fragmentShader={fragmentWater}
          // transparent={true}
        />
      </mesh>
    </group>
  )
}

export default Water;