import React from 'react'

import PlaygroundController from './PlaygroundController'
import Playground from '../entities/Playground'
import CameraController from './CameraController'
import { CharacterController } from './CharacterController'
import DisplayScreen from '../entities/DisplayScreen'
import Ground from '../entities/Ground'
import Water from '../meshes/Water'
import StaticCuboid from '../entities/StaticCuboid'
import { ILevelSceneComponent } from '../data/sceneComponents'
import CuboidCheckpoint from '../entities/physics/CuboidCheckpoint'
import useCheckpoint from '../hooks/useCheckpoint'
import RoundedBox from '../entities/RoundedBox'
import { Vector3 } from 'three'

const LevelController = React.memo(() => {
  const {level, sceneInstance, sequence, checkpointTrigger} = useCheckpoint();

  const sceneComponents = level.sceneData;
  const cssData = level.cssData;
  const playgroundComponents = sceneComponents.filter(i => i.type === 'playground');
  const screenComponents = sceneComponents.filter(i => i.type === 'screen');
  const checkpointComponents = sceneComponents.filter(i => i.type === 'checkpoint');
  const restSceneComponents = sceneComponents.filter(i => !['screen', 'playground', 'checkpoint'].includes(i.type));

  const ps = Array(playgroundComponents.length).fill(0).map((_, i) => i);

  const spawnPoint = (level.checkpointCode === 'cp0' ?
    restSceneComponents.find(i => i.type === 'spawnpoint') :
    checkpointComponents.find(i => i.id === level.checkpointCode)
    ).position;

  // const spawnPoint = checkpointComponents.find(i => i.id === 'cp1').position;
  
  function onDeath() {
    checkpointTrigger('death');
  }

  const spawnPointVector: Vector3 = new Vector3().fromArray(spawnPoint);
  
  return (
    <CameraController spawnPoint={spawnPointVector} sequence={sequence} sceneInstance={sceneInstance}>
      <React.Fragment key={sceneInstance}>
        {restSceneComponents && restSceneComponents.map((sceneComponent, index) => {
          return <LevelSceneComponent key={index} component={sceneComponent} />
        })}
        {checkpointComponents && checkpointComponents.map((checkpointComponent) => {
            return <CuboidCheckpoint 
              checkpointData={checkpointComponent}
              intersectionHandler={checkpointTrigger} />;
        })}
        {ps.map((i) => {
          const pc = playgroundComponents.find(c => c.quizId === `q${i}`);
          const sc = screenComponents.find(c => c.quizId === `q${i}`);
          const quizData = cssData.find(q => q.id === `q${i}`)!;
          
          return (
            <PlaygroundController quizData={quizData} key={i}>
              <LevelSceneComponent component={pc} />
              <LevelSceneComponent component={sc} />
            </PlaygroundController>
          );
        })}
        {[0].map(() => {
        return (
          <CharacterController 
              position={spawnPoint}
              onDeath={onDeath}
            />
          )
      })}
      </ React.Fragment>
    </CameraController>
  )
});

export default LevelController;

function LevelSceneComponent({ component }: ILevelSceneComponent) {
  switch (component.type) {
    case 'ground':
      return <Ground position={component.position} />;
    case 'water':
      return <Water position={component.position} />;
    case 'step':
      return <StaticCuboid position={component.position} args={component.args} />;
    case 'playground':
      return <Playground playgroundData={component} />;
    case 'screen':
      return <DisplayScreen screenData={component} />;
    case 'cube':
      return <RoundedBox
          position={component.position}
          rotation={component.rotation as [number, number, number] ?? [0, 0, 0]} 
          color='#a0c8eb'
        />;
    default:
      return null; // or some fallback component
  }}
