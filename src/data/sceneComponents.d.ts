import { Vector3Tuple } from "@react-three/rapier";
import { GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps } from "../entities/entities";
import { QuizQuestion } from "./levels";

interface CommonProps extends GroundProps, WaterProps, StaticCuboidProps, RoundedBoxMeshProps {}

export interface SceneComponent extends CommonProps {
  type: 'spawnPoint' | 'ground' | 'water' | 'step';
  position: Vector3Tuple;
  args?: number[];
  boxMargin?: number;
  blocks?: PlaygroundBoxProps[];
}

export interface ScenePlaygroundComponent extends CommonProps {
  type: 'playground';
  position: Vector3Tuple;
  
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

export interface ILevelSceneComponent {
  component: SceneComponent | ScenePlaygroundComponent | SceneScreenComponent;
  quizData?: QuizQuestion;
}
