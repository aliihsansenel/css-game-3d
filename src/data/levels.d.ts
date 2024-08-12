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

export interface QuizQuestions {
  [key: string]: QuizQuestion[];
}

declare const QuizQuestions: QuizQuestions;

export default QuizQuestions;
