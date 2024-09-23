
import { useGLTF, useAnimations } from '@react-three/drei';
import CharacterAnimController from '../controllers/anim/CharacterAnimController';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CameraModes, CameraStates, CameraTargetContext } from '../controllers/CameraController';
import { publish, subscribe, unsubscribe } from '../utils/events';
import { ILevelPickableComponent } from '../data/sceneComponents';
import { LevelPickableComponent } from '../controllers/ScenePickableController';
import { Object3D, Vector3 } from 'three';

const Character = () => {
  // const [prevPool, setPrevPool] = useState<ILevelPickableComponent['component'][]>([]);
  const [pickedUpObject, setPickedUpObject] = useState<ILevelPickableComponent['component'] | null>(null);
  const { scene, animations } = useGLTF('/models/robot.glb');
  const characterMeshRef = useRef();
  const { actions } = useAnimations(animations, scene);

  const ctc = useContext(CameraTargetContext);

  const handlePickupObject = useCallback((event) => {
    const { obj, comp } = (event as CustomEvent).detail;
    if (pickedUpObject === null) {
      publish('deleteObject', { comp: comp, obj: obj });
      const pickedUpComp = {...comp};
      pickedUpComp.position = [0, 1.2, 1.5];
      setPickedUpObject(pickedUpComp);
    } else {
      const v = (characterMeshRef.current! as Object3D).getWorldPosition(new Vector3()).clone().add(new Vector3(0, 1.2, 1.5));
      pickedUpObject.position = [v.x, v.y, v.z];
      publish('spawnObject', { comp: pickedUpObject });

      // setPrevPool((oldState) => {
      //   console.log(oldState);
      //   const filtered = oldState.filter(c => c.id !== pickedUpObject.id);
      //   return [...filtered, pickedUpObject];
      // });
      setPickedUpObject(null);
    }
  }, [pickedUpObject]);

  useEffect(() => {
    subscribe('pickupObject', handlePickupObject);
  
    return () => {
      unsubscribe('pickupObject', handlePickupObject);
    }
  }, [handlePickupObject])

  return (
    <>
      <CharacterAnimController actions={actions } />
      {/* {prevPool.map(((component)=> {
        return <LevelPickableComponent key={component.component.id} component={component.component}  physicsType='dynamic' />;
      }))} */}
      {pickedUpObject && <LevelPickableComponent component={pickedUpObject}  physicsType='static' />}
      <primitive object={scene} ref={characterMeshRef}scale={[0.55, 0.55, 0.55]} visible={
        !(ctc?.cameraStatus.mode === CameraModes.ScreenFocus &&
        ctc?.cameraStatus.state === CameraStates.OnTarget)
      } />
    </>
  );
}

export default Character;