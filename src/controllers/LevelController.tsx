import PlaygroundController from './PlaygroundController'
import Playground from '../entities/Playground'
import CameraController from './CameraController'
import { CharacterController } from './CharacterController'
import DisplayScreen from '../entities/DisplayScreen'
import { Level } from '../data/levels';
import { SceneComponent } from '../data/sceneComponents'
import Ground from '../entities/Ground'
import Water from '../meshes/Water'
import StaticCuboid from '../entities/StaticCuboid'

interface LevelControllerProps {
  level: Level;
}

function LevelController({ level }: LevelControllerProps) {
  const sceneComponents = level.sceneData;
  const playgroundComponent = sceneComponents.find(i => i.type === 'playground');
  
  return (
    <>
      {sceneComponents.filter(i => i.type !== 'playground').map((component, index) => {
        return <LevelSceneComponent key={index} component={component} />
      })}
      <PlaygroundController level={level}>
        {playgroundComponent && <LevelSceneComponent component={playgroundComponent} />}
        <CameraController>
          <DisplayScreen />
          <CharacterController />
        </CameraController>
      </PlaygroundController>
    </>
  )
}

export default LevelController

function LevelSceneComponent({ component }: {component: SceneComponent}) {
  switch (component.type) {
    case 'ground':
      return <Ground position={component.position} />;
    case 'water':
      return <Water position={component.position} />;
    case 'step':
      return <StaticCuboid position={component.position} args={component.args} />;
    case 'playground':
      return <Playground position={component.position} />;
    default:
      return null; // or some fallback component
  }
}