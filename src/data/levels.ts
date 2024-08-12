import type { QuizQuestion } from "./levels.d";

const levelData: Record<string, QuizQuestion[]> = {
  "l0": [
    {
      selector: '.div',
      pv: [
        {
          prop: 'justify-content',
          values: ['flex-end', 'end'],
          editable: true
        }
      ],
      color: 'black'
    }
  ],
};

export class Level {
  #levelCode: string;
  #cssData: QuizQuestion[]; 
  
  constructor(levelCode: string | null) {
    this.#levelCode = levelCode || 'l0';
    this.#cssData = levelData[this.#levelCode];
  }

  prevLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) - 1}`;
    if (levelData[newLevel]) {
      this.#levelCode = newLevel;
      this.#cssData = levelData[this.#levelCode];
    }
    return this;
  }

  nextLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) + 1}`;
    if (levelData[newLevel]) {
      this.#levelCode = newLevel;
      this.#cssData = levelData[this.#levelCode];
    }
    return this;
  }
  
  get classData() {
    return this.#cssData;
  }
}

export default levelData;
