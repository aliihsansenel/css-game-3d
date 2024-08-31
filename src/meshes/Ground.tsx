import { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

import { Mesh } from 'three'

function GroundMesh(props: ThreeElements['mesh']) {
  const meshRef = useRef<Mesh>(null!);
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      receiveShadow>
      <boxGeometry args={[15, 1, 20]} />
      <meshStandardMaterial color={[0.027, 0.651, 0.345]} />
    </mesh>
  )
}

export default GroundMesh;