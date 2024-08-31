
import { useGLTF, useAnimations } from '@react-three/drei';
import CharacterAnimController from '../controllers/anim/CharacterAnimController';
import { useContext } from 'react';
import { CameraTargetContext } from '../controllers/CameraController';

const Character = () => {
  const { scene, animations } = useGLTF('/models/robot.glb');
  const { actions } = useAnimations(animations, scene);

  const ctc = useContext(CameraTargetContext);

  return (
    <>
      <CharacterAnimController actions={actions } />
      <primitive object={scene} scale={[0.55, 0.55, 0.55]} visible={!ctc?.isCameraToggled} />
    </>
  );
}

export default Character;