import { useState, useEffect, useContext } from 'react';
import { Level } from '../data/levels';
import { HUDContext } from '../controllers/HUDController';

function useCheckpoint() {
  const [level, setLevel] = useState(new Level('l3'));
  const [sceneInstance, setSceneInstance] = useState<number>(0);

  const hudContext = useContext(HUDContext);
  const newLevelText = hudContext ? hudContext.newLevelText : () => {};
  const resetText = hudContext ? hudContext.resetText : () => {};

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'e') {
        const levelInfo = level.levelInfo()
        if (levelInfo.isLevelCompleted && levelInfo.nextLevel !== null ) {
          setLevel(level => level.nextLevel())
          setSceneInstance(sceneInstance => sceneInstance + 1)
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
      return;
    }
    level.newCheckPoint(checkpointCode);
    const levelInfo = level.levelInfo()
    if (levelInfo.isLevelCompleted && levelInfo.nextLevel !== null ) {
      newLevelText(levelInfo.nextLevel)
    }
  }

  return {level, sceneInstance, checkpointTrigger};
}

export default useCheckpoint;
