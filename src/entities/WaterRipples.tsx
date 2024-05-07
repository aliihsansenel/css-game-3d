
import vertexRipple from "../shaders/vector/ripple.glsl";
import fragmentRipple from "../shaders/fragment/ripple.glsl";

import { Geometry, Base, Intersection } from '@react-three/csg'
import { useFrame } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import { useRef } from "react";

function WaterRipples({ size }: { size: { w: number, h: number} }) {

  const matRef = useRef<ShaderMaterial>(null!)
  const meshRef = useRef<Mesh>(null!)

  useFrame(({clock }) =>{
    if(matRef.current){
      matRef.current.uniforms.uTime = { value: clock.getElapsedTime()};
    }
  })

  const uniforms = {
    uTime: { value: 0.0 },
  };

  const IntersectionMesh = 
        <mesh ref={meshRef}>
          <Geometry>
            <Base>
              <planeGeometry args={[size.w, size.h]} />
            </Base>
            <Intersection scale={[1.4,1.4,1.4]}>
              <boxGeometry args={[1, 1, 1]} />
            </Intersection>
          </Geometry>
          <shaderMaterial
            ref={matRef}
            uniforms={uniforms} 
            vertexShader={vertexRipple}
            fragmentShader={fragmentRipple}
            transparent
          />
        </mesh>;

  return (
    <group position={[0.0, 0.0, 0.001]}>
      {IntersectionMesh}
      { meshRef.current && (
          <lineSegments position={[0.0, 0.0, 0.001]}>
            <edgesGeometry attach="geometry" args={[meshRef.current.geometry]} />
            <lineBasicMaterial attach="material" color={[0.0, 0.0, 0.0]}/>
          </lineSegments>
        )
      }
    </group>
  )
}

export default WaterRipples