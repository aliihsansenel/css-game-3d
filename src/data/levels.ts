import type { LevelComponents, LevelDataType, QuizQuestion } from "./levels.d";

import { toCamelCase } from "../utils/helper";

const levelData: LevelDataType = {
  "l0": {
    scene: [
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'water', position: [5, 0, 0] },
      { type: 'ground', position: [22, 0, 0] },
      { type: 'step', position: [-1, 0, -6], args: [3, 1, 2] },
      { type: 'playground', position: [8.8 - 0.1, 0.0, 0.01],
        boxMargin: 0.5,
        blocks: [
          { args: [9.0, 1.0, 1.5] },
          { args: [9.0, 1.0, 1.5] }
        ]
      },
    ],
    quiz: [
      {
        selector: '.div',
        pv: [
          {
            prop: 'justify-content',
            values: ['flex-end', 'end'],
            editable: true,
            state: 2
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

  initialPropState() {
    const questions = this.#cssData[0].pv;

    const obj: Record<string, string> = {};
    questions.forEach(pv => {
      if (pv.state > 0)
        obj[toCamelCase(pv.prop)] = pv.state === 2 ? pv.values[0] : "";
    });
    return obj;
  }

  initialInputState() {
    const questions = this.#cssData[0].pv;

    const obj: Record<string, string> = {};
    questions.forEach((pv, index) => {
      if (pv.state > 0)
        obj[`prop-${index}`] = pv.prop;
        obj[`value-${index}`] = pv.state === 2 ? pv.values[0] : "";
    });
    return obj;
  }

}

export default levelData;
