import { GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps } from "../entities/entities";

export interface SceneComponent extends GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps {
  type: 'ground' | 'water' | 'step' | 'playground';
  position: [number, number, number];
  args?: number[];
}