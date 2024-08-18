import { Group, Vector3, Vector3Tuple } from "three";
import { Flex, Box } from '@react-three/flex';
import { Edges, Plane } from '@react-three/drei';
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlaygroundContext } from "../controllers/PlaygroundController";
import RoundedBoxMesh from "../meshes/RoundedBox";
import KinematicCuboid from "./KinematicCuboid";
import { RapierRigidBody } from "@react-three/rapier";
import StaticCuboid from "./StaticCuboid";
import { debounce } from "../utils/helper";

function Playground({ position }: { position: Vector3Tuple }) {
  const { flexProps } = useContext(PlaygroundContext);
  const outlinePos = new Vector3().fromArray(position);
  outlinePos.setY(position[2] + 0.2);

  // Array of colors for the RoundedBoxMeshs
  const colors = ["#c2acac", "#c05a5a", "#6f1f1f",];
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
    debounce(adjustRigidBodies, 500), 
  [adjustRigidBodies]);

  useEffect(() => {
    debounceAdjustRigidBodies();
  }, [flexProps]);

  return (
    <group ref={groupRef}
      position={position} 
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
        {colors.map((color, index) => (
          <Box key={index} centerAnchor margin={0.5}>
            <RoundedBoxMesh
              ref={el => srcRefs.current[index] = el}
              args={[9.0, 1.0, 1.5]}
              material-color={color}
            />
          </Box>
        ))}
      </Flex>
      <group rotation={[Math.PI / 2, 0.0, 0.0]} position={[-7.4,0,0]}>
        {colors.map((color, index) => (
          <StaticCuboid
            key={counter.counter + index}
            position={counter.positions[index]}
            args={[9.0, 1.0, 1.5]}
            material-color={color}
            transparent
            opacity={0.0}
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
