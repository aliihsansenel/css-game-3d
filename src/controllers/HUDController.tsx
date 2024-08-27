import { createContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import HUDText from '../hud/HUDText'; // Import HUDText component

interface HUDContextType {
  newLevelText: (levelNumber: number) => void;
}

export const HUDContext = createContext<HUDContextType | null>(null);

function HUDController({children}: { children: React.ReactNode; }) {
  const [text, setText] = useState('');
  
  function newLevelText(levelNumber: number) {
    setText(`Level ${levelNumber}`);
  }

  useEffect(() => {
    setText('test')
  }, [])
  
  return (
    <HUDContext.Provider value={{ 
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