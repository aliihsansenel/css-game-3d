import { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

import vertexWater from "../shaders/vector/water.glsl";
import fragmentWater from "../shaders/fragment/water.glsl";
import WaterRipples from "../entities/WaterRipples";
import { Group } from "three";

function Water(props: ThreeElements['group']) {
  const groupRef = useRef<Group>(null!);

  const width = 18;
  const height = 20;

  return (
    <group {...props}
      rotation={[-Math.PI / 2.0,0, 0]}
      ref={groupRef}
    >
      <WaterRipples size={{ w: width, h: height }}/>
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