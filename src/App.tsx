import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { Physics } from "@react-three/rapier";

import KeyboardController from "./controllers/input/KeyboardController";
import Water from "./meshes/Water";
import Ground from "./entities/Ground";
import RoundedBox from "./entities/RoundedBox";
import { CharacterController } from "./controllers/CharacterController";
import Playground from "./entities/Playground";

function App() {
  return (
    <KeyboardController>
      <Canvas>
        <Suspense>
          <Physics colliders={false} debug>
            <ambientLight intensity={0.2} />
            <directionalLight intensity={1.0} position={[1, 1, 1]} />
            <Ground position={[-10, 0, 0]} />
            <Water position={[5, 0, 0]} />
            <Ground position={[20, 0, 0]} />
            <RoundedBox position={[-6, 5, 0]} rotation={[Math.PI / 4.0, Math.PI / 4.0, 0]}/>
            <Playground position={[5.0, 0.0, 0.01]} />
            <CharacterController />
            <OrbitControls />
            {/* <RoundedBox position={[0, 10, 0]} rotation={[Math.PI / 4.0, Math.PI / 4.0, 0]}/> */}
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardController>
  );
}

export default App;