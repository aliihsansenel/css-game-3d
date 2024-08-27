import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import HUDController from "./controllers/HUDController";
import KeyboardController from "./controllers/input/KeyboardController";
import LevelController from "./controllers/LevelController";

import "./App.css"

function App() {
  
  return (
    <KeyboardController>
      <HUDController>
        <Canvas>
          <Suspense>
            <Physics colliders={false} debug>
              <ambientLight intensity={0.6} />
              <directionalLight intensity={0.6} position={[1, 1, 1]} />
              <LevelController />
            </Physics>
          </Suspense>
        </Canvas>
      </HUDController>
    </KeyboardController>
  );
}

export default App;