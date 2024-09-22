import { Object3D, Scene, Vector3 } from "three";
import { ScenePickableComponent } from "../data/sceneComponents";

export function findClosestPickable(scene: Scene, src: Object3D, dst: ScenePickableComponent[] ) : Object3D | null {
  let minDistance = Infinity;
  let closestObject = null;
  const srcPos = src.getWorldPosition(new Vector3());

  dst.forEach(component => {
    const name = `pickable${component.type.charAt(0).toUpperCase()}${component.type.slice(1)}-${component.id}`;
    const obj = scene.getObjectByName(name);
    
    if (!obj)
      return;
    const dist = srcPos.distanceTo(obj.getWorldPosition(new Vector3()));
    if (dist < minDistance) {
      minDistance = dist;
      closestObject = obj;
    }
  });

  return closestObject;
}