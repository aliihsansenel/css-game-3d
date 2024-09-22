import React, { useEffect } from 'react'

import { ILevelPickableComponent } from '../data/sceneComponents'
import { Level } from '../data/levels'
import PickableCube from '../entities/physics/PickableCube';
import { useThree } from '@react-three/fiber';
import { findClosestPickable } from '../utils/points';
import { Object3D } from 'three';
import { publish } from '../utils/events';

interface ComponentProps {
  children: React.ReactNode[];
  level: Level;
}

const ScenePickableController = React.memo(({children, level} : ComponentProps) => {
  const scene = useThree(state => state.scene);
  const pickableComponents = level.pickableData;

  useEffect(() => {

    const handleKeyDown = (event: { key: string; }) => {
      if (event.key === 'f' && pickableComponents!.length > 0) {
        const character = scene.getObjectByName('character-0') as Object3D;
        const closestPickableObject = findClosestPickable(scene, character, pickableComponents!);
        if (closestPickableObject)
          publish('removeObject', { objectName: closestPickableObject.name });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pickableComponents]);

  return (
    <>
      {children}
      {pickableComponents && pickableComponents.map((pickableComponent, index) => {
        return <LevelPickableComponent key={index} component={pickableComponent} />
      })}
    </>
  )
});

export default ScenePickableController;

function LevelPickableComponent({ component }: ILevelPickableComponent) {
  const type = `pickable${component.type.charAt(0).toUpperCase()}${component.type.slice(1)}`;
  switch (type) {
    case 'pickableCube':
      return <PickableCube color='#e39fcc' component={component} />;
  default:
    return null; // or some fallback component
  }}
