import { SceneComponent } from "./sceneComponents";

export interface QuizQuestion {
  selector: string;
  pv: PropertyValue[];
  color: string;
}

interface PropertyValue {
  prop: string;
  values: string[];
  editable: boolean;
}

export interface LevelComponents {
  scene: SceneComponent[];
  quiz: QuizQuestion[];
}

export type LevelDataType = Record<string, LevelComponents>;

declare const LevelDataType: LevelDataType;

export default LevelDataType;
