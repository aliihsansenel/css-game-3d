import React, { createContext, useState } from 'react'
import { createPortal } from 'react-dom';
import HUDText from '../hud/HUDText'; // Import HUDText component

interface HUDContextType {
  resetText: () => void;
  newLevelText: (levelNumber: number) => void;
}

export const HUDContext = createContext<HUDContextType | null>(null);

function HUDController({children}: { children: React.ReactNode; }) {
  const [text, setText] = useState('');
  
  function resetText() {
    setText('');
  }

  function newLevelText(levelNumber: number) {
    setText(`Press E to skip to LEVEL ${levelNumber}`);
  }
  
  return (
    <HUDContext.Provider value={{
        resetText,
        newLevelText
      }}>
      {children}
      {createPortal(
        <HUDText text={text} key={0}/>,
        document.getElementById('info') as HTMLElement
      )}
    </HUDContext.Provider>
  )
}

export default HUDController