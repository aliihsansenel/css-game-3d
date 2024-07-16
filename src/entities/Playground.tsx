import { Vector3, Vector3Tuple } from "three";
import { Flex, Box } from '@react-three/flex';
import { Edges, Plane } from '@react-three/drei';
import RoundedBoxMesh from "../meshes/RoundedBox";

function Playground({ position }: { position: Vector3Tuple }) {

  const outlinePos = new Vector3().fromArray(position);
  outlinePos.setY(position[2] + 0.2);

  return (
    <>
      <Flex 
        justifyContent="flex-start" 
        alignItems="flex-start" 
        position={position}
        rotation={[0.0, -Math.PI, 0.0]}
        plane="xz"
        size={[10.0, 10.0, 10.0]}
        flexWrap="wrap"
        centerAnchor
        >
        <Box centerAnchor margin={0.5}>
          <RoundedBoxMesh args={[9.0, 1.0, 1.0]} material-color="#c2acac" />
        </Box>
        <Box centerAnchor margin={0.5}>
          <RoundedBoxMesh args={[9.0, 1.0, 1.0]} material-color="#c05a5a" />
        </Box>
        <Box centerAnchor margin={0.5}>
          <RoundedBoxMesh args={[9.0, 1.0, 1.0]} material-color="#6f1f1f" />
        </Box>
        <Box centerAnchor margin={0.5}>
          <RoundedBoxMesh args={[9.0, 1.0, 1.0]} material-color="#271010"  />
        </Box>
      </Flex>
      <Plane args={[10, 10, 1, 1]} position={outlinePos} rotation={[-Math.PI / 2, 0.0, 0.0]} >
        <meshBasicMaterial transparent opacity={0.0}/>
        <Edges color="red" />
      </Plane>
    </>
  )
}

export default Playground;
