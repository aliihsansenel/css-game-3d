import { ThreeElements, useFrame } from "@react-three/fiber"
import { useRef } from "react"

import vertexWater from "../shaders/vector/water.glsl";
import fragmentWater from "../shaders/fragment/water.glsl";
import vertexRipple from "../shaders/vector/ripple.glsl";
import fragmentRipple from "../shaders/fragment/ripple.glsl";

import { Group, ShaderMaterial } from 'three'
import { Geometry, Base, Intersection } from '@react-three/csg'

function Water(props: ThreeElements['group']) {
  const groupRef = useRef<Group>(null!);
  const matRef = useRef<ShaderMaterial>(null!)

  const width = 18;
  const height = 20;

  useFrame(({clock }) =>{
    if(matRef.current){
      matRef.current.uniforms.uTime = { value: clock.getElapsedTime()};
    }
  })

  const uniforms = {
    uTime: { value: 0.0 },
  };

  return (
    <group {...props}
      rotation={[-Math.PI / 2.0,0, 0]}
      ref={groupRef}
    >
      <mesh position={[0.0, 0.0, 0.001]}>
        <Geometry>
          <Base>
            <planeGeometry args={[width, height]} />
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
      </mesh>
      <mesh position={[0.0, 0.0, 0.0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='white' />
        </mesh>
      <mesh>
        <planeGeometry args={[width, height, width * 3, height * 3]} />
        <shaderMaterial vertexShader={vertexWater} fragmentShader={fragmentWater} />
      </mesh>
    </group>
  )
}

export default Water;