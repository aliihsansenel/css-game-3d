import { Canvas } from "@react-three/fiber";
import Ground from "./meshes/Ground";

import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 0]} />
      <Ground position={[-10, 0, 0]} />
      <Ground position={[15, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}

export default App;