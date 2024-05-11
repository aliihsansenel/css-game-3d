import { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

import { Mesh } from 'three'

function Character(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  
  return (
    <mesh
      {...props}
      ref={meshRef}>
      <cylinderGeometry args={[0.5, 0.5, 1.6, 16]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Character;