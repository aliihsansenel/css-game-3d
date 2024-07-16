
import { useGLTF, useAnimations } from '@react-three/drei';
import CharacterAnimController from '../controllers/anim/CharacterAnimController';

const Character = () => {
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions } = useAnimations(animations, scene);

  return (
    <>
      <CharacterAnimController actions={actions }/>
      <primitive object={scene} scale={[0.55, 0.55, 0.55]}/>
    </>
  );
}

export default Character;