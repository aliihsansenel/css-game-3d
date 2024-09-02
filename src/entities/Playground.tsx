import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { AdditiveBlending, Color, Group, Mesh, NoBlending, NormalBlending, Vector3, Vector3Tuple } from "three";
import { Flex, Box } from '@react-three/flex';
import { Edges, Plane } from '@react-three/drei';

import { PlaygroundContext } from "../controllers/PlaygroundController";
import RoundedBoxMesh from "../meshes/RoundedBoxMesh";

import { debounce } from "../utils/helper";
import { ScenePlaygroundComponent } from "../data/sceneComponents";
import PlaygroundBlock from "./physics/PlaygroundBlock";

interface PlaygroundComponentProps {
  playgroundData: ScenePlaygroundComponent;
}

function Playground({ playgroundData }: PlaygroundComponentProps) {
  const playgroundContext = useContext(PlaygroundContext);
  const flexProps = playgroundContext?.flexProps; // Use optional chaining to avoid null error

  const pos = playgroundData.position;
  const outlinePos = new Vector3().fromArray(pos);
  outlinePos.setY(pos[1] + 0.2); // Corrected index to set Y position based on the correct axis

  const playgroundBoxes: ScenePlaygroundComponent['blocks'] = playgroundData.blocks || []; // Fixed type assignment and provided a default empty array

  const groupRef = useRef<(Group | null)>(null!);
  const srcRefs = useRef<(Mesh | null)[]>([]);

  const [counter, setCounter] = useState<{
    positions: Vector3Tuple[];
    counter: number;
  }>({positions: [], counter: 0});

  function adjustRigidBodies() {
    const arr = srcRefs.current;
    
      const positions: Vector3Tuple[] = [];
      arr.forEach((box) => {
        if (box) {
          const position: Vector3 = box.getWorldPosition(new Vector3());
          const tuple: Vector3Tuple = [position.x, position.y, position.z]
          positions.push(tuple);
          
        }
      });
      setCounter(counter => ({ positions, counter: counter.counter + arr.length }))
  }

  const debounceAdjustRigidBodies = useCallback(
    debounce(adjustRigidBodies, 250), 
  [adjustRigidBodies]);

  useEffect(() => {
    if (flexProps) {
      debounceAdjustRigidBodies();
    }
  }, [flexProps]);

  return (
    <group ref={groupRef}
      position={pos} 
      rotation={[-Math.PI / 2, 0.0, 0.0]}
    >
      <Flex
        {...flexProps}
        rotation={[(-Math.PI / 2) * 3, (-Math.PI), 0.0]}
        plane="xz"
        size={[10.0, 10.0, 10.0]}
        flexWrap="wrap"
        centerAnchor
      >
        {playgroundBoxes.map((box, index) => (
          <Box key={index} centerAnchor margin={playgroundData.boxMargin}>
            <RoundedBoxMesh
              ref={el => srcRefs.current[index] = el as Mesh}
              args={box.args}
              color="#e3a58a"
            />
          </Box>
        ))}
      </Flex>
      <group rotation={[Math.PI / 2, 0.0, 0.0]}
        position={[-pos[0], -pos[1], -pos[2]]}
      >
        {playgroundBoxes.map((box, index) => (
          <PlaygroundBlock
            key={counter.counter + index}
            position={counter.positions[index]}
            args={box.args}
          />
        ))}
      </group>
      <Plane args={[10, 10, 1, 1]} renderOrder={1} >
        <meshBasicMaterial
          transparent
          opacity={0.0}
          color={new Color(0.11, 0.678, 0.878)}
          // blending={NoBlending}
        />
        <Edges color="red" />
      </Plane>
    </group>
  )
}

export default Playground;
