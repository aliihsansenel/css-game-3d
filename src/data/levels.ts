import type { LevelComponents, LevelDataType, QuizQuestion } from "./levels.d";

import { toCamelCase } from "../utils/helper";
import { WritableFlexProps } from "../controllers/PlaygroundController";

const levelData: LevelDataType = {
  "l0": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [-5, 2.5, -7], screenRange: 5, quizId: 'q0',},
      { type: 'water', position: [5, 0, 0] },
      { type: 'step', position: [-1, 0, -6], args: [3, 1, 2] },
      { type: 'playground',
        position: [8.8 - 0.1, 0.02, 0.01],
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
      { type: 'playground', position: [8.8 - 0.1, 0.02, 0.01],
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
      { type: 'playground',
        position: [40.8 - 0.1, 0.02, 0.01],
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
      { type: 'playground',
        position: [8.8 - 0.1, 0.02, 0.01],
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
  "l3": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [4, 2.5, -8.5], screenRange: 3, quizId: 'q0',},
      { type: 'water', position: [10, 0, 0], size: [20, 40] },
      { type: 'step', position: [2, 0, -6], args: [8, 1, 2] },
      { type: 'step', position: [7, 0, 3.5], args: [2, 1, 2] },
      { type: 'playground',
        position: [13.8 - 0.1, 0.02, 3.01],
        quizId: 'q0',
        boxMargin: 0.5,
        size: [12, 10],
        blocks: [
          { args: [9.0, 1.0, 1.5] },
          { args: [9.0, 1.0, 1.5] }
        ]
      },
      { type: 'step', position: [22, 0, 8], args: [2, 1, 2] },
      { type: 'ground', position: [34, 0, 0] },
      { type: 'checkpoint', id: 'cp1', position: [28, 2, 0], rotation: [0, 0, 0], sizeArgs: [2, 3, 10] },
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
  "l4": {
    scene: [
      { type: 'spawnpoint', position: [-6, 0, -2] },
      { type: 'ground', position: [-10, 0, 0] },
      { type: 'screen', position: [1.5, 2.5, -8.5], screenRange: 3, quizId: 'q0',},
      { type: 'water', position: [10, 0, 0], size: [20, 40] },
      { type: 'playground',
        position: [8.4 - 0.1, 0.02, 0.01],
        quizId: 'q0',
        boxMargin: 0.5,
        size: [12, 10],
        blocks: [
          { args: [4.3, 1.0, 1.5] },
        ]
      },
      { type: 'step', position: [10, 0, -10.8], args: [2, 1, 5] },
      { type: 'step', position: [7, 1.0, -8.0], args: [4, 3, 0.3] },
      { type: 'step', position: [-1, 0, 7], args: [2, 1, 1.5] },
      { type: 'ground', position: [34, 0, 0] },
      { type: 'checkpoint', id: 'cp1', position: [28, 2, 0], rotation: [0, 0, 0], sizeArgs: [2, 3, 10] },
      { type: 'cube', position: [33, 1.01, -2], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 1.01, -1], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 1.01, 0], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 1.01, 1], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 1.01, 2], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 2.01, -1.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 2.01, -0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 2.01, 0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 2.01, 1.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 3.01, -1.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 3.01, -0.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 3.01, 1.0], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 4.01, -0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 4.01, 0.5], rotation: [0, 0, 0] },
      { type: 'cube', position: [33, 5.01, 0.0], rotation: [0, 0, 0] },
    ],
    pickable: [
      { type: 'cube', position: [-5, 1.01, 1.5], rotation: [0, 0, 0], id: 0 },
      { type: 'cube', position: [10, 0.9, -13], rotation: [0, 0, 0], id: 1 },
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
                values: ['flex-start', 'end'],
                editable: true,
                state: 1
              },
              {
                prop: 'align-items',
                values: ['flex-end'],
                editable: true,
                state: 2
              }
            ],
            color: 'black'
          }
        ],
        hint: 'justify-content: flex-start (default) |  flex-end |  center |  space-between |  space-around;'
      }
    ],
    stationary: {
      plates: [
        { id: 0, position: [-7, .5, -7] },
        { id: 1, position: [-7, .5, 7] },
        { id: 2, position: [10, .5, 10], grounded: true },
      ],
      platforms: [
        { id: 0, sizeArgs: [1.5, 1.0, 1.5], paths: [
          { id: 0, position: [2, 0, 7], reducer: (ids: number[]) => !ids.includes(0) },
          { id: 1, position: [2, 0, -5], reducer: (ids: number[]) => ids.includes(0) },
          ],
        },
        { id: 1, sizeArgs: [1.5, 1.0, 1.5], paths: [
          { id: 0, position: [10, 0, 7], reducer: (ids: number[]) => !ids.includes(0) },
          { id: 1, position: [25, 0, 7], reducer: (ids: number[]) => ids.includes(1) && ids.includes(2) },
          ],
        }
      ]
    }
  },
};

export class Level {
  #levelCode: string;
  #checkpointCode: string;
  #checkpointCount: number;
  #sceneData: LevelComponents['scene'];
  #pickableData: LevelComponents['pickable'];
  #stationaryData: LevelComponents['stationary'];
  #cssData: QuizQuestion[];
  
  constructor(levelCode: string | null) {
    this.#levelCode = levelCode || 'l0';
    this.#checkpointCode = 'cp0';
    this.#sceneData = levelData[this.#levelCode].scene;
    this.#pickableData = levelData[this.#levelCode].pickable || [];
    this.#stationaryData = levelData[this.#levelCode].stationary;
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

  get pickableData() {
    return this.#pickableData;
  }

  get stationaryData() {
    return this.#stationaryData;
  }

  get cssData() {
    return this.#cssData;
  }

  static initialPropState(quizData: QuizQuestion) {
    const blocks = quizData.blocks;
    const questions = blocks.map(i => i.pv).flat();

    const obj: Partial<WritableFlexProps> = {};
    questions.forEach(pv => {
      if (pv.state > 0) {
        const camelCasedKey = toCamelCase(pv.prop);
        const value = pv.state === 2 ? pv.values[0] : "";
          obj[camelCasedKey] = value;
      }
    });
    return obj;
  }

  static initialInputState(quizData: QuizQuestion) {
    const blocks = quizData.blocks;
    const questions = blocks.map(i => i.pv).flat();

    const obj: WritableFlexProps = {};
    questions.forEach((pv, index) => {
      if (pv.state > 0)
        obj[`prop-${index}`] = pv.prop;
        obj[`value-${index}`] = pv.state === 2 ? pv.values[0] : "";
    });
    return obj;
  }

}

export default levelData;
