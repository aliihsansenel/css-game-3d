import type { LevelComponents, LevelDataType, QuizQuestion } from "./levels.d";

import { toCamelCase } from "../utils/helper";

const levelData: LevelDataType = {
  "l0": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [-5, 2.5, -7], screenRange: 5, quizId: 'q0',},
      { type: 'water', position: [5, 0, 0] },
      { type: 'step', position: [-1, 0, -6], args: [3, 1, 2] },
      { type: 'playground', position: [8.8 - 0.1, 0.0, 0.01],
        quizId: 'q0',
        screenPosition: [-5, 2.5, -4],
        boxMargin: 0.5,
        blocks: [
          { args: [9.0, 1.0, 1.5] },
          { args: [9.0, 1.0, 1.5] }
        ]
      },
      { type: 'ground', position: [22, 0, 0] },
      { type: 'checkpoint', id: 'cp1', position: [17, 1, 0], rotation: [0,0,0], sizeArgs: [2, 3, 10] },
    ],
    quiz: [
      {
        id: 'q0',
        blocks: [
          {
            selector: '#container',
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
        ],
        hint: 'justify-content: flex-start (default) |  flex-end |  center |  space-between |  space-around;'
      }
    ]
  },
  "l1": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [-5, 2.5, -4], quizId: 'q0', screenRange: 5},
      { type: 'water', position: [5, 0, 0] },
      { type: 'step', position: [-1, 0, 0], args: [3, 1, 2] },
      { type: 'playground', position: [8.8 - 0.1, 0.0, 0.01],
        quizId: 'q0',
        screenPosition: [-5, 2.5, -4],
        boxMargin: 0.5,
        blocks: [
          { args: [9.0, 1.0, 1.5] },
        ]
      },
      { type: 'ground', position: [22, 0, 0] },
      { type: 'checkpoint', id: 'cp1', position: [17, 1, 0], rotation: [0,0,0], sizeArgs: [2, 3, 10] },
      { type: 'screen', position: [27, 2.5, -4], quizId: 'q1', screenRange: 5},
      { type: 'water', position: [37, 0, 0] },
      { type: 'step', position: [31, 0, 6], args: [3, 1, 2] },
      { type: 'playground', position: [40.8 - 0.1, 0.0, 0.01],
        quizId: 'q1',
        screenPosition: [25, 2.5, -4],
        boxMargin: 0.5,
        blocks: [
          { args: [9.0, 1.0, 1.5] },
        ]
      },
      { type: 'ground', position: [54, 0, 0] },
      { type: 'checkpoint', id: 'cp2', position: [49, 1, 0], rotation: [0,0,0], sizeArgs: [2, 3, 10] },
    ],
    quiz: [
      {
        id: 'q0',
        blocks: [
          {
            selector: '#container',
            pv: [
              {
                prop: 'justify-content',
                values: ['center'],
                editable: true,
                state: 0
              }
            ],
            color: 'black'
          }
        ],
        hint: 'justify-content: flex-start (default) |  flex-end |  center |  space-between |  space-around;'
      },
      {
        id: 'q1',
        blocks: [
          {
            selector: '#container',
            pv: [
              {
                prop: 'justify-content',
                values: ['flex-start', 'start'],
                editable: true,
                state: 1
              }
            ],
            color: 'black'
          }
        ],
        hint: 'justify-content: flex-start (default) |  flex-end |  center |  space-between |  space-around;'
      } 
    ]
  },
  "l2": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [-5, 2.5, -4], screenRange: 5, quizId: 'q0',},
      { type: 'water', position: [5, 0, 0] },
      { type: 'step', position: [-1, 0, 0], args: [3, 1, 2] },
      { type: 'step', position: [2.2, 1, 0], args: [2.5, 0.5, 2] },
      { type: 'step', position: [5, 2, 0], args: [2.5, 0.5, 2] },
      { type: 'playground', position: [8.8 - 0.1, 0.0, 0.01],
        quizId: 'q0',
        screenPosition: [-5, 2.5, -4],
        boxMargin: 0.5,
        blocks: [
          { args: [1.5, 1.0, 1.5] },
        ]
      },
      { type: 'step', position: [13, 0, 7], args: [2, 1, 2] },
      { type: 'ground', position: [22, 0, 0] },
      { type: 'checkpoint', id: 'cp1', position: [17, 1, 0], rotation: [0,0,0], sizeArgs: [2, 3, 10] },
      { type: 'cube', position: [23, 1.01, -2], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 1.01, -1], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 1.01, 0], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 1.01, 1], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 1.01, 2], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 2.01, -1.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 2.01, -0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 2.01, 0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 2.01, 1.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 3.01, -1.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 3.01, -0.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 3.01, 1.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 4.01, -0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 4.01, 0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [23, 5.01, 0.0], rotation: [0, 0, 0] },
    ],
    quiz: [
      {
        id: 'q0',
        blocks: [
          {
            selector: '#container',
            pv: [
              {
                prop: 'justify-content',
                values: ['flex-end', 'end'],
                editable: true,
                state: 2
              },
              {
                prop: 'align-items',
                values: ['flex-end', 'end'],
                editable: true,
                state: 2
              }
            ],
            color: 'black'
          }
        ],
        hint: 'justify-content: flex-start (default) |  flex-end |  center |  space-between |  space-around; align-items: flex-start |  flex-end |  center |  baseline |  stretch (default);'
      }
    ]
  },
};

export class Level {
  #levelCode: string;
  #checkpointCode: string;
  #checkpointCount: number;
  #sceneData: LevelComponents['scene'];
  #cssData: QuizQuestion[];
  
  constructor(levelCode: string | null) {
    this.#levelCode = levelCode || 'l0';
    this.#checkpointCode = 'cp0';
    this.#sceneData = levelData[this.#levelCode].scene;
    this.#cssData = levelData[this.#levelCode].quiz;
    this.#checkpointCount = this.setCheckPointCount()
  }

  setCheckPointCount() {
    return this.#sceneData.filter(i => i.type === 'checkpoint').length;
  }

  prevLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) - 1}`;
    if (levelData[newLevel]) {
      return new Level(newLevel); // Return a new instance
    }
    return this; // Return the current instance if no previous level
  }

  nextLevel() {
    const newLevel = `l${parseInt(this.#levelCode.slice(1)) + 1}`;
    if (levelData[newLevel]) {
      return new Level(newLevel); // Return a new instance
    }
    return this; // Return the current instance if no next level
  }

  newCheckPoint(checkpointCode: string) {
    if (!checkpointCode.startsWith('cp'))
      return;
    const index: number = parseInt(checkpointCode.split('cp')[1]) | 0;
    const current: number = parseInt(this.#checkpointCode.split('cp')[1]) | 0;
    
    if(index > current)
      this.#checkpointCode = `cp${index}`;
  }

  isLevelCompleted(): boolean {
    const index: number = parseInt(this.#checkpointCode.split('cp')[1]) | 0;
    if(index >= this.#checkpointCount)
      return true;
    return false;
  }

  levelInfo() {
    const prevLevelNumber = parseInt(this.#levelCode.slice(1)) - 1;
    const nextLevelNumber = parseInt(this.#levelCode.slice(1)) + 1;
    const prevLevel = `l${prevLevelNumber}`;
    const nextLevel = `l${nextLevelNumber}`;

    return {
      prevLevel: levelData[prevLevel] ? prevLevelNumber + 1 :  null,
      nextLevel: levelData[nextLevel] ? nextLevelNumber + 1 :  null,
      isLevelCompleted: this.isLevelCompleted()
    }
  }

  get levelCode() {
    return this.#levelCode;
  }

  get checkpointCode() {
    return this.#checkpointCode;
  }

  get checkpointCount() {
    return this.#checkpointCount;
  }

  get sceneData() {
    return this.#sceneData;
  }

  get cssData() {
    return this.#cssData;
  }

  static initialPropState(quizData: QuizQuestion) {
    const blocks = quizData.blocks;
    const questions = blocks.map(i => i.pv).flat();

    const obj: Record<string, string> = {};
    questions.forEach(pv => {
      if (pv.state > 0)
        obj[toCamelCase(pv.prop)] = pv.state === 2 ? pv.values[0] : "";
    });
    return obj;
  }

  static initialInputState(quizData: QuizQuestion) {
    const blocks = quizData.blocks;
    const questions = blocks.map(i => i.pv).flat();

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
