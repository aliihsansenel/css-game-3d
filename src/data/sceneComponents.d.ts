import { GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps } from "../entities/entities";

export interface SceneComponent extends GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps {
  type: 'ground' | 'water' | 'step';
  position: [number, number, number];
  args?: number[];
  boxMargin?: number;
  blocks?: PlaygroundBoxProps[];
}

export interface ScenePlaygroundComponent extends GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps {
  type: 'playground';
  position: [number, number, number];
  boxMargin?: number;
  blocks?: PlaygroundBoxProps[];
}
