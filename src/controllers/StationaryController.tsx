import React, { useEffect, useState } from 'react'

import { ScenePlateComponent, ScenePlatformComponent } from '../data/sceneComponents';
import { Level } from '../data/levels'
import Plate from '../entities/physics/Plate';
import Platform from '../entities/physics/Platform';
import { LevelComponents } from '../data/levels.d';

interface ComponentProps {
  level: Level;
}

export type PlatesStateType = Record<string, boolean>;

const StationaryController = React.memo(({ level } : ComponentProps) => {
  const stationaryComponents = level.stationaryData as LevelComponents['stationary'];
  const plates = stationaryComponents.plates;
  const platforms = stationaryComponents.platforms;

  const [platesState, setPlatesState] = useState<PlatesStateType>({});

  function plateStateController(id: number, isCollapsed: boolean) {

    setPlatesState((state) => {
      // console.log(state, id, isCollapsed);
      if (state[id] !== undefined && state[id] === isCollapsed) {
        return state;
      }
      return {...state, [id]: isCollapsed};
    });
  }
  if (!stationaryComponents)
    return <></>;
  
  return (
    <>
      {plates && plates.map((plate: ScenePlateComponent) => {
        return <Plate key={plate.id} component={plate} notifyController={plateStateController} />
      })}
      {platforms && platforms.map((platform : ScenePlatformComponent ) => {
        return <Platform key={platform.id} component={platform} platesState={platesState} />
      })}
    </>
  )
});

export default StationaryController;