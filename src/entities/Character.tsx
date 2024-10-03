
import { useGLTF, useAnimations, Shadow } from '@react-three/drei';
import CharacterAnimController from '../controllers/anim/CharacterAnimController';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CameraModes, CameraStates, CameraTargetContext } from '../controllers/CameraController';
import { publish, subscribe, unsubscribe } from '../utils/events';
import { ILevelPickableComponent } from '../data/sceneComponents';
import { LevelPickableComponent } from '../controllers/ScenePickableController';
import { Group, Object3D, Vector3 } from 'three';

const Character = ({ setInertiaCofactor } : { setInertiaCofactor: ( cofactor : number) => void }) => {
  const [pickedUpObject, setPickedUpObject] = useState<ILevelPickableComponent['component'] | null>(null);
  const { scene, animations } = useGLTF('/models/robot.glb');
  const characterMeshRef = useRef<Group>(null!);
  const { actions } = useAnimations(animations, scene);

  const ctc = useContext(CameraTargetContext);

  const handlePickupObject = useCallback((event: Event) => {
    const { obj, comp } = (event as CustomEvent).detail;
    if (pickedUpObject === null) {
      publish('deleteObject', { comp: comp, obj: obj });
      const pickedUpComp = {...comp};
      pickedUpComp.position = [0, 1.2, 1.5];
      setPickedUpObject(pickedUpComp);
      setInertiaCofactor(0.8);
    } else {
      const characterObject = (characterMeshRef.current! as Object3D);
      const v = characterObject.localToWorld(new Vector3(0, 1.2, 1.5));
      pickedUpObject.position = [v.x, v.y, v.z];
      const wd = characterObject.getWorldDirection(new Vector3()).clone().normalize();
      pickedUpObject.rotation = [0, Math.atan2(wd.x, wd.z), 0];
      publish('spawnObject', { comp: pickedUpObject });

      setPickedUpObject(null);
      setInertiaCofactor(1);
    }
  }, [pickedUpObject, setInertiaCofactor]);

  

  useEffect(() => {
    subscribe('pickupObject', handlePickupObject);
  
    return () => {
      unsubscribe('pickupObject', handlePickupObject);
    }
  }, [handlePickupObject])

  return (
    <group ref={characterMeshRef}>
      <CharacterAnimController actions={actions } />
      {pickedUpObject && <LevelPickableComponent component={pickedUpObject} physicsType='static' />}
      <primitive object={scene} scale={[0.55, 0.55, 0.55]} visible={
        !(ctc?.cameraStatus.mode === CameraModes.ScreenFocus &&
        ctc?.cameraStatus.state === CameraStates.OnTarget)
      } />
      {/* TODO fix shadow */}
      <Shadow
        color="black"
        colorStop={0}
        opacity={0.3}
        position={[0,0.01,0]}
        scale={[2.1, 2.1, 2.1]}
        fog={false} // Reacts to fog (default=false)
      />
    </group>
  );
}

export default Character;