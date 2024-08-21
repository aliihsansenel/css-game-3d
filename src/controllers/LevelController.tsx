import PlaygroundController from './PlaygroundController'
import Playground from '../entities/Playground'
import CameraController from './CameraController'
import { CharacterController } from './CharacterController'
import DisplayScreen from '../entities/DisplayScreen'
import { Level } from '../data/levels';
import { LevelSceneComponent, SceneComponent, ScenePlaygroundComponent, SceneScreenComponent } from '../data/sceneComponents'
import Ground from '../entities/Ground'
import Water from '../meshes/Water'
import StaticCuboid from '../entities/StaticCuboid'

interface LevelControllerProps {
  level: Level;
}

function LevelController({ level }: LevelControllerProps) {
  const sceneComponents = level.sceneData;
  const playgroundComponents = sceneComponents.filter(i => i.type === 'playground');
  const screenComponents = sceneComponents.filter(i => i.type === 'screen');
  const restSceneComponents = sceneComponents.filter(i => !['screen', 'playground'].includes(i.type));

  return (
    <>
      {restSceneComponents.map((component, index) => {
        return <LevelSceneComponent key={index} component={component} />
      })}
      <PlaygroundController level={level}>
        {playgroundComponents && playgroundComponents.map((playgroundComponent, index) => {
          return <LevelSceneComponent key={index} component={playgroundComponent} />
        })}
        <CameraController>
        {screenComponents && screenComponents.map((screenComponent, index) => {
          return <LevelSceneComponent key={index} component={screenComponent} />
        })}
          <CharacterController />
        </CameraController>
      </PlaygroundController>
    </>
  )
}

export default LevelController

function LevelSceneComponent({ component }: LevelSceneComponent) {
  switch (component.type) {
    case 'ground':
      return <Ground position={component.position} />;
    case 'water':
      return <Water position={component.position} />;
    case 'step':
      return <StaticCuboid position={component.position} args={component.args} />;
    case 'playground':
      return <Playground position={component.position} />;
    case 'screen':
      return <DisplayScreen position={component.position} rotation={component.rotation}/>;
    default:
      return null; // or some fallback component
  }
}