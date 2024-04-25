import { ThreeElements } from "@react-three/fiber"
import { useRef } from "react"

function Ground(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  return (
    <mesh
      {...props}
      ref={meshRef}>
      <boxGeometry args={[15, 1, 20]} />
      <meshStandardMaterial color='green' />
    </mesh>
  )
}

export default Ground;