import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import KeyboardController from "./controllers/input/KeyboardController";
import Water from "./meshes/Water";
import Ground from "./entities/Ground";
import RoundedBox from "./entities/RoundedBox";
import { CharacterController } from "./controllers/CharacterController";
import Playground from "./entities/Playground";
import StaticCuboid from "./entities/StaticCuboid";
import { DisplayScreen } from "./entities/DisplayScreen";
import CameraController from "./controllers/CameraController";

import "./App.css"
import PlaygroundController from "./controllers/PlaygroundController";

function App() {
  return (
    <KeyboardController>
      <Canvas>
        <Suspense>
          <Physics colliders={false} debug>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.6} position={[1, 1, 1]} />
            <Ground position={[-10, 0, 0]} />
            <Water position={[5, 0, 0]} />
            <Ground position={[20, 0, 0]} />
            <RoundedBox position={[-6, 5, 0]} rotation={[Math.PI / 4.0, Math.PI / 4.0, 0]} />
            <StaticCuboid position={[-1, 0, 0]} args={[3, 1, 2]} />
            <PlaygroundController>
              <Playground position={[7.5 - 0.1, 0.0, 0.01]} />
              <CameraController>
                <DisplayScreen />
                <CharacterController />
              </CameraController>
            </PlaygroundController>
            {/* <RoundedBox position={[0, 10, 0]} rotation={[Math.PI / 4.0, Math.PI / 4.0, 0]}/> */}
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardController>
  );
}

export default App;