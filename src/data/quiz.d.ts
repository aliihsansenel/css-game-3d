interface QuizQuestion {
  selector: string;
  pv: PropertyValue[];
  color: string;
}

interface PropertyValue {
  prop: string;
  values: string[];
  editable: boolean;
}

interface QuizQuestions {
  [key: string]: QuizQuestion[];
}

declare const QuizQuestion: QuizQuestions;

export default QuizQuestion;
