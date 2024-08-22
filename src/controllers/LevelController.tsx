import PlaygroundController from './PlaygroundController'
import Playground from '../entities/Playground'
import CameraController from './CameraController'
import { CharacterController } from './CharacterController'
import DisplayScreen from '../entities/DisplayScreen'
import { Level } from '../data/levels';
import Ground from '../entities/Ground'
import Water from '../meshes/Water'
import StaticCuboid from '../entities/StaticCuboid'
import { ILevelSceneComponent } from '../data/sceneComponents'

interface LevelControllerProps {
  level: Level;
}

function LevelController({ level }: LevelControllerProps) {
  const sceneComponents = level.sceneData;
  const cssData = level.cssData;
  const playgroundComponents = sceneComponents.filter(i => i.type === 'playground');
  const screenComponents = sceneComponents.filter(i => i.type === 'screen');
  const restSceneComponents = sceneComponents.filter(i => !['screen', 'playground'].includes(i.type));

  const ps = Array(playgroundComponents.length).fill(0).map((_, i) => i);

  return (
    <CameraController>
      {restSceneComponents && restSceneComponents.map((sceneComponent, index) => {
          return <LevelSceneComponent key={index} component={sceneComponent} />
      })}
      {ps.map((i) => {
        const pc = playgroundComponents.find(c => c.quizId === `q${i}`);
        const sc = screenComponents.find(c => c.quizId === `q${i}`);
        const quizData = cssData.find(q => q.id === `q${i}`);
        
        return (
          <PlaygroundController quizData={quizData} key={i}>
            <LevelSceneComponent component={pc} />
            <LevelSceneComponent component={sc} />
          </PlaygroundController>
        );
      })}
      <CharacterController />
    </CameraController>
  )
}

export default LevelController

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
    default:
      return null; // or some fallback component
  }
}