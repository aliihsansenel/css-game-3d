import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

import HUDController from "./controllers/HUDController";
import KeyboardController from "./controllers/input/KeyboardController";
import LevelController from "./controllers/LevelController";

import "./App.css"
import SceneLight from "./entities/SceneLight";
// import WebGPURenderer from "three/addons/renderers/webgpu/WebGPURenderer.js";

function App() {
  
  return (
    <KeyboardController>
      <HUDController>
        <Canvas shadows
          // gl={(canvas) => {
          //   const renderer = new WebGPURenderer({
          //     canvas: canvas as HTMLCanvasElement,
          //   });
          //   return renderer;
          // }}
        >
          <Suspense>
            <Physics colliders={false}>
              <SceneLight />
              <LevelController />
            </Physics>
          </Suspense>
        </Canvas>
      </HUDController>
    </KeyboardController>
  );
}

export default App;