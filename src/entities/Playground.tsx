import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { Group, Vector3 } from "three";
import { Flex, Box } from '@react-three/flex';
import { Edges, Plane } from '@react-three/drei';

import { PlaygroundContext } from "../controllers/PlaygroundController";
import RoundedBoxMesh from "../meshes/RoundedBox";

import { debounce } from "../utils/helper";
import { ScenePlaygroundComponent } from "../data/sceneComponents";
import PlaygroundBlock from "./physics/PlaygroundBlock";

interface PlaygroundComponentProps {
  playgroundData: ScenePlaygroundComponent;
}

function Playground({ playgroundData }: PlaygroundComponentProps) {
  const { flexProps } = useContext(PlaygroundContext);

  const pos = playgroundData.position;
  const outlinePos = new Vector3().fromArray(pos);
  outlinePos.setY(pos[2] + 0.2);

  const playgroundBoxes: ScenePlaygroundComponent['blocks'][] = playgroundData.blocks;

  const groupRef = useRef<(Group | null)>(null!);
  const srcRefs = useRef<(RoundedBoxMesh | null)[]>([]);

  const [counter, setCounter] = useState<{
    positions: Vector3[];
    counter: number;
  }>({positions: [], counter: 0});

  function adjustRigidBodies() {
    const arr = srcRefs.current;
      const positions: Vector3[] = [];
      arr.forEach((box) => {
        if (box) {
          const position: Vector3 = box.getWorldPosition(new Vector3());
          positions.push(position);
          
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
        rotation={[-Math.PI / 2, 0.0, 0.0]}
        alignItems="flex-start"
        plane="xz"
        size={[10.0, 10.0, 10.0]}
        flexWrap="wrap"
        centerAnchor
      >
        {playgroundBoxes.map((box, index) => (
          <Box key={index} centerAnchor margin={playgroundData.boxMargin}>
            <RoundedBoxMesh
              ref={el => srcRefs.current[index] = el}
              args={box.args}
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
      <Plane args={[10, 10, 1, 1]}
       >
        <meshBasicMaterial transparent opacity={0.0}/>
        <Edges color="red" />
      </Plane>
    </group>
  )
}

export default Playground;
