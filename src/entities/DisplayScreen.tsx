import { useState, useEffect, useRef, useContext, FocusEvent } from "react";

import { Html, Plane, RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

import quizQuestions from "../data/quiz.js";
import { Group } from "three";
import { CameraTargetContext } from "../controllers/CameraController.js";

export const DisplayScreen = () => {
  const [hidden, set] = useState<boolean>(false);
  const displayScreen = useRef<Group>(null!); 
  const cameraTargetContext = useContext(CameraTargetContext);

  const width = 4.5;
  const heigth = 2.5;

  useEffect(() => {
    if (cameraTargetContext)
      cameraTargetContext.setDisplayScreen(displayScreen.current);
  }, [cameraTargetContext]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getFocus(_: FocusEvent<HTMLInputElement>): void {
    if (cameraTargetContext && !cameraTargetContext.isCameraToggled) {
      cameraTargetContext.focusScreen();
    }
  }

  return (
    <group position={[-5, 2.5, -4]} ref={displayScreen}>
      <RigidBody
        colliders={false}
        type="fixed"
      >
        <RoundedBox args={[width, heigth, 0.1]}>
          <meshBasicMaterial color="black" />
          <Plane args={[width - 0.3, heigth - 0.3]} position={[0, 0, .11]} >
          <meshBasicMaterial color="white" />
            <Html position={[0, 0, 0.01]}
              transform
              occlude 
              onOcclude={set}
              style={{
                transition: 'all 0.5s',
                opacity: (!cameraTargetContext?.isCameraToggled && hidden) ? 0 : 1,
              }} >
              <ScreenContent handler={getFocus} />
            </Html>
          </Plane>
        </RoundedBox>
        <CuboidCollider args={[width / 2.0, heigth / 2.0, 0.1]} />
      </RigidBody>
    </group>
  );
}

function ScreenContent({handler}:{handler: (event: FocusEvent<HTMLInputElement>) => void}) {
  const contentId = 'l0';
  const content = quizQuestions[contentId];

  return (
    <div className="screen-content">
      {content.map((block, index) => (
        <div key={index} style={{ color: block.color }}>
          <div>{block.selector}&nbsp;{'{'}</div>
          <div className="pv">
            {block.pv.map((pvItem, pvIndex) => (
              <div key={pvIndex}>
                <input
                    type="text"
                    defaultValue={!pvItem.editable ? pvItem.prop : ""} 
                    disabled={!pvItem.editable} // Disable input if not editable
                    onChange={() => {
                      // Handle value change if needed
                    }}
                    onFocus={handler}
                  />
                <span>:</span>
                <input
                    type="text"
                    defaultValue={!pvItem.editable ? pvItem.values[0] : ""}
                    disabled={!pvItem.editable} // Disable input if not editable
                    onChange={() => {
                      // Handle value change if needed
                    }}
                  />
              </div>
            ))}
          </div>
          <div>{'}'}</div>
        </div>
      ))}
    </div>
  );
}

export default DisplayScreen