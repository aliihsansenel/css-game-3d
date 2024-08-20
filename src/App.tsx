import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import KeyboardController from "./controllers/input/KeyboardController";
import LevelController from "./controllers/LevelController";

import "./App.css"
import { Level } from "./data/levels";

function App() {
  const [level, setLevel] = useState(new Level('l0'));
  return (
    <KeyboardController>
      <Canvas>
        <Suspense>
          <Physics colliders={false} debug>
            <ambientLight intensity={0.5} />
            <directionalLight intensity={0.6} position={[1, 1, 1]} />
            <LevelController level={level} />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardController>
  );
}

export default App;