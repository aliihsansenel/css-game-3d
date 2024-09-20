import { Euler, ThreeElements } from "@react-three/fiber"; // Importing MeshProps to avoid verbosity
import { RoundedBox } from '@react-three/drei';
import { Vector3Tuple } from "three";

export interface GroundProps {
  position: Vector3Tuple
}

export interface WaterProps extends Partial<ThreeElements['group']> { 
  size?: [number, number];
}

export interface StaticCuboidProps extends Partial<ThreeElements['mesh']> { 
  position: Vector3Tuple;
}

export interface RoundedBoxMeshProps extends Partial<typeof RoundedBox>, Partial<ThreeElements['mesh']> {
  args?: NamedArrayTuple;
  position?: Vector3Tuple;
  rotation?: Euler;
  color?: string;
  visible?: boolean;
}

export interface PlaygroundBoxProps extends Partial<RoundedBoxMeshProps> { // Using MeshProps for brevity
  
}