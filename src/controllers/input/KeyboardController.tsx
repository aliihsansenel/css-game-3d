import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import React, { useMemo } from 'react'

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

function KeyboardController(props: { children: React.ReactNode }) {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], []);

  return (
    <KeyboardControls map={map}>
      {props.children}
    </KeyboardControls>
  )
}

export default KeyboardController;