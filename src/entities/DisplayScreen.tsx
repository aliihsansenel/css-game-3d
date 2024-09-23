import { useState, useEffect, useRef, useContext, FocusEvent, useCallback } from "react";

import { Html, Plane, RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import { Group } from "three";
import { CameraModes, CameraTargetContext } from "../controllers/CameraController.js";
import { debounce } from "../utils/helper.js";
import { PlaygroundContext, PlaygroundContextType } from "../controllers/PlaygroundController.js";
import { SceneScreenComponent } from "../data/sceneComponents.js";
import { QuizQuestion } from "../data/levels.d";
import { Level } from "../data/levels.js";
import ScreenSensor from "./physics/ScreenSensor.js";

interface DisplayScreenProps {
  screenData: SceneScreenComponent;
}

export const DisplayScreen = ({screenData } : DisplayScreenProps) => {
  const [hidden, set] = useState<boolean>(false);
  const displayScreen = useRef<Group>(null!); 
  const cameraTargetContext = useContext(CameraTargetContext);
  const playgroundContext = useContext(PlaygroundContext);

  const parseCSS = playgroundContext ? playgroundContext.parseCSS : () => {};
  const quizData = playgroundContext ? playgroundContext.quizData : null;

  const width = 4.5;
  const heigth = 2.5;

  function setDisplayScreen(isThisScreen:boolean) {
    if (cameraTargetContext){
      if (isThisScreen) {
        cameraTargetContext.setDisplayScreen(displayScreen.current);
      }
      else {
        cameraTargetContext.setDisplayScreen(null);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getFocus(_: FocusEvent<HTMLInputElement>): void {
    if (!cameraTargetContext) return;
    const {mode} = cameraTargetContext.cameraStatus;
    if (mode !== CameraModes.ScreenFocus) {
      cameraTargetContext.focusScreen();
    }
  }

  return (
    <group position={screenData.position} ref={displayScreen}>
      <ScreenSensor screenRange={screenData.screenRange} setDisplayScreen={setDisplayScreen} />
      <RigidBody
        colliders={false}
        type="fixed"
      >
        <RoundedBox args={[width, heigth, 0.1]} castShadow>
          <meshBasicMaterial color="black" />
          <Plane args={[(width - 0.3) * 3.0, (heigth - 0.3) * 3.0]} position={[0, 0, .11]} scale={[0.33, 0.33, 0.33]} >
            <meshBasicMaterial color="white" />
            <Html position={[0, 0, 0.01]}
              transform
              occlude 
              onOcclude={set}
              style={{
                transform: 'scale(3)',
                transition: 'all 0.5s',
                opacity: (cameraTargetContext?.cameraStatus.mode === CameraModes.ScreenFocus || !hidden) ? 1 : 0,
              }} >
              <ScreenContent handler={getFocus}
                parseCSS={parseCSS}
                quizData={quizData}/>
            </Html>
          </Plane>
        </RoundedBox>
        <CuboidCollider args={[width / 2.0, heigth / 2.0, 0.1]} />
      </RigidBody>
    </group>
  );
}

function ScreenContent(
  {quizData, handler, parseCSS} : 
  {
    quizData: QuizQuestion | null,
    handler: (event: FocusEvent<HTMLInputElement>) => void, 
    parseCSS: PlaygroundContextType['parseCSS'] | undefined
  }) {
  
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
    quizData ? Level.initialInputState(quizData): {} );

  const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: event.target.value,
    }));
  };

  const debouncedParseCSS = useCallback(
    debounce((values) => { parseCSS?.(values as { [key: string]: string }) }, 1000), 
  [parseCSS]);

  useEffect(() => {
    debouncedParseCSS(inputValues);
  }, [inputValues]);

  return (
    <div className="screen-content">
      <div>
        {quizData && quizData.blocks.map((block, index) => (
          <div key={index} className="quizBlock" style={{ color: block.color }}>
            <div>{block.selector}&nbsp;{'{'}</div>
            <div className="pv">
              {block.pv.map((pvItem, pvIndex) => (
                <div key={pvIndex}>
                  <input
                      type="text"
                      value={!pvItem.editable ? pvItem.prop : inputValues[`prop-${pvIndex}`] || ""} 
                      disabled={!pvItem.editable} // Disable input if not editable
                      onChange={handleInputChange(`prop-${pvIndex}`)}
                      onFocus={handler}
                    />
                  <span>:</span>
                  <input
                      type="text"
                      value={!pvItem.editable ? pvItem.values[0] : inputValues[`value-${pvIndex}`] || ""} 
                      disabled={!pvItem.editable} // Disable input if not editable
                      onChange={handleInputChange(`value-${pvIndex}`)}
                      onFocus={handler}
                    />
                </div>
              ))}
            </div>
            <div>{'}'}</div>
          </div>
        ))}
      </div>
      <div>
        {quizData?.hint && (
          <div className="hint">{quizData.hint}</div>
        )}
      </div>
    </div>
  );
}

export default DisplayScreen