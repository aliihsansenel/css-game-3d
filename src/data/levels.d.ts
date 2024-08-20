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
  state: 0 | 1 | 2;
}

export interface LevelComponents {
  scene: (SceneComponent | ScenePlaygroundComponent)[];
  quiz: QuizQuestion[];
}

export type LevelDataType = Record<string, LevelComponents>;

declare const LevelDataType: LevelDataType;

export default LevelDataType;
