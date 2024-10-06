import { useState, useEffect, useContext } from 'react';
import { Level } from '../data/levels';
import { HUDContext } from '../controllers/HUDController';

export const enum Sequence{
  FirstSpawn,
  Respawn,
}

function useCheckpoint() {
  const [level, setLevel] = useState(new Level('l0'));
  const [sceneInstance, setSceneInstance] = useState<number>(0);
  const [sequence, setSequence] = useState<Sequence>(Sequence.FirstSpawn);

  const hudContext = useContext(HUDContext);
  const newLevelText = hudContext ? hudContext.newLevelText : () => {};
  const gameOverText = hudContext ? hudContext.gameOverText : () => {};
  const resetText = hudContext ? hudContext.resetText : () => {};

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e') {
        const levelInfo = level.levelInfo()
        if (levelInfo.isLevelCompleted && levelInfo.nextLevel !== null ) {
          setLevel(level => level.nextLevel())
          setSceneInstance(sceneInstance => sceneInstance + 1)
          setSequence(Sequence.FirstSpawn)
          resetText();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [level]);

  function checkpointTrigger(checkpointCode: string) {
    if (checkpointCode === 'death') {
      setSceneInstance(sceneInstance => sceneInstance + 1)
      setSequence(Sequence.Respawn)
      return;
    }
    level.newCheckPoint(checkpointCode);
    const levelInfo = level.levelInfo()
    if (levelInfo.isLevelCompleted) {
      if (levelInfo.nextLevel === null)
        gameOverText();
      else
        newLevelText(levelInfo.nextLevel);
    }
  }

  return {level, sceneInstance, sequence, checkpointTrigger};
}

export default useCheckpoint;
