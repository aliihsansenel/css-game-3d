import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';

import Ground from "./meshes/Ground";
import Water from "./meshes/Water";

function App() {

  
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1.0} position={[1, 1, 1]} />
      <Ground position={[-10, 0, 0]} />
      <Water position={[5, 0, 0]} />
      <Ground position={[20, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;