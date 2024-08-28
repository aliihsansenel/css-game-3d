import { SceneComponent } from "./sceneComponents";

export interface QuizQuestion {
  id: string;
  blocks: QuizQuestionBlock[];
  hint: string | null;
}

export interface QuizQuestionBlock {
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
  scene: (SceneComponent | ScenePlaygroundComponent | SceneScreenComponent)[];
  quiz: QuizQuestion[];
}

export type LevelDataType = Record<string, LevelComponents>;

declare const LevelDataType: LevelDataType;

export default LevelDataType;
