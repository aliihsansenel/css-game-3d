import { CuboidArgs, Vector3Tuple } from "@react-three/rapier";
import { GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps } from "../entities/entities";
import { QuizQuestion } from "./levels";

interface CommonProps extends GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps {}

export interface SceneComponent extends CommonProps {
  type: 'spawnpoint' | 'ground' | 'water' | 'step' | 'cube';
  position: Vector3Tuple;
  args?: number[];
  boxMargin?: number;
  blocks?: PlaygroundBoxProps[];
}

export interface ScenePlaygroundComponent extends CommonProps {
  type: 'playground';
  position: Vector3Tuple;
  size: [number, number];
  boxMargin?: number;
  blocks?: PlaygroundBoxProps[];
}

export interface SceneScreenComponent extends CommonProps {
  type: 'screen';
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  screenRange: number;
  quizId: string;
}

export interface SceneCheckpointComponent extends CommonProps {
  type: 'checkpoint';
  id: string;
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  sizeArgs: CuboidArgs;
}

export interface SceneCubeComponent extends CommonProps {
  type: 'cube';
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
}

export interface ScenePickableCubeComponent extends SceneCubeComponent {
  id: number;
}

export interface ScenePlateComponent {
  id: number;
  position: Vector3Tuple;
  grounded?: boolean;
}

// Plate (id array) => boolean (is position of path activated)
export type ScenePlatfromReducer = (ids : number[]) => boolean;

export interface ScenePlatformComponent {
  id: number;
  sizeArgs?: Vector3Tuple;
  paths: { 
    id: number;
    position: Vector3Tuple,
    reducer: ScenePlatfromReducer 
  }[];
}

export interface ILevelStationaryComponent {
  plates: ScenePlateComponent[];
  platforms: ScenePlatformComponent[];
}

export interface ILevelSceneComponent {
  component: SceneComponent | 
    ScenePlaygroundComponent | 
    SceneScreenComponent | 
    SceneCheckpointComponent | 
    SceneCubeComponent;
  quizData?: QuizQuestion;
}
export interface ILevelPickableComponent {
  component: ScenePickableCubeComponent;
  physicsType: 'dynamic' | 'static';
}

export type ScenePickableComponent = ScenePickableCubeComponent;