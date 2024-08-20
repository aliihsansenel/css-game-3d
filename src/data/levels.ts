import type { LevelComponents, LevelDataType, QuizQuestion } from "./levels.d";

const levelData: LevelDataType = {
  "l0": {
    scene: [
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'water', position: [5, 0, 0] },
      { type: 'ground', position: [20, 0, 0] },
      { type: 'step', position: [-1, 0, 0], args: [3, 1, 2] },
      { type: 'playground', position: [7.5 - 0.1, 0.0, 0.01] },
    ],
    quiz: [
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
    ]
  },
};

export class Level {
  #levelCode: string;
  #sceneData: LevelComponents['scene'];
  #cssData: QuizQuestion[]; 
  
  constructor(levelCode: string | null) {
    this.#levelCode = levelCode || 'l0';
    this.#sceneData = levelData[this.#levelCode].scene;
    this.#cssData = levelData[this.#levelCode].quiz;
  }

  prevLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) - 1}`;
    if (levelData[newLevel]) {
      this.#levelCode = newLevel;
      this.#cssData = levelData[this.#levelCode].quiz;
    }
    return this;
  }

  nextLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) + 1}`;
    if (levelData[newLevel]) {
      this.#levelCode = newLevel;
      this.#cssData = levelData[this.#levelCode].quiz;
    }
    return this;
  }
  
  get sceneData() {
    return this.#sceneData;
  }

  get cssData() {
    return this.#cssData;
  }

}

export default levelData;
