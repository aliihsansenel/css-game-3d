import React from 'react'

import { ScenePlateComponent, ScenePlatformComponent } from '../data/sceneComponents';
import { Level } from '../data/levels'
import Plate from '../entities/physics/Plate';
import Platform from '../entities/physics/Platform';
import { LevelComponents } from '../data/levels.d';

interface ComponentProps {
  level: Level;
}

const StationaryController = React.memo(({ level } : ComponentProps) => {
  const stationaryComponents = level.stationaryData as LevelComponents['stationary'];
  const plates = stationaryComponents?.plates;
  const platforms = stationaryComponents?.platforms;

  if (!stationaryComponents)
    return <></>;

  return (
    <>
      {plates && plates.map((plate: ScenePlateComponent) => {
        return <Plate key={plate.id} component={plate} />
      })}
      {platforms && platforms.map((platform : ScenePlatformComponent ) => {
        return <Platform key={platform.id} component={platform} />
      })}
    </>
  )
});

export default StationaryController;