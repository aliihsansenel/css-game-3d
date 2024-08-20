import { Vector3, ThreeElements } from "@react-three/fiber"; // Importing MeshProps to avoid verbosity
import { RoundedBox } from '@react-three/drei';

export interface GroundProps {
  position: Vector3
}

export interface WaterProps extends Partial<ThreeElements['group']> { }

export interface StaticCuboidProps extends Partial<ThreeElements['mesh']> { 
  position: Vector3
}

export interface RoundedBoxMeshProps extends Partial<RoundedBox> { // Using MeshProps for brevity
  color?: string;
}