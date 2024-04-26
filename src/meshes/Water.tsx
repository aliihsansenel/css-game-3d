import { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

import vertexShader from "../shaders/vector/water.glsl";
import fragmentShader from "../shaders/fragment/water.glsl";

import { Mesh } from 'three'

function Water(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  const width = 18;
  const height = 20;

  return (
    <mesh
      {...props}
      rotation={[-Math.PI / 2.0,0, 0]}
      ref={meshRef}>
      <planeGeometry args={[width, height, width * 3, height * 3]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  )
}

export default Water;