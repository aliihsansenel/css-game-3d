import React, { createContext } from 'react'

interface HUDContextType {
  resetText: () => void;
  screenText: () => void;
  newLevelText: (levelNumber: number) => void;
  gameOverText: () => void;
}

export const HUDContext = createContext<HUDContextType | null>(null);

function HUDController({children}: { children: React.ReactNode; }) {
  // const [text, setText] = useState('');
  
  function setText(text: string) {
    const infoElement = document.getElementById('info');
    if (infoElement) {
        infoElement.textContent = text;
    }
  }
  const resetText = React.useCallback(() => {
    setText('');
  }, []);

  const screenText = React.useCallback(() => {
    setText(`Press E to edit CSS`);
  }, []);

  const newLevelText = React.useCallback((levelNumber: number) => {
    setText(`Press E to skip to LEVEL ${levelNumber}`);
  }, []);

  const gameOverText = React.useCallback(() => {
    setText(`GAME OVER`);
  }, []);
  
  return (
    <HUDContext.Provider value={{
        resetText,
        screenText,
        newLevelText,
        gameOverText
      }}>
      {children}
      {/* {createPortal(
        <HUDText text={text} key={0}/>,
        document.getElementById('info') as HTMLElement
      )} */}
    </HUDContext.Provider>
  )
}

export default HUDController