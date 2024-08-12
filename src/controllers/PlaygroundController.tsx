import { createContext } from 'react'

export interface PlaygroundContextType {
  parseCSS: (inputvalues: { [key: string]: string }) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

function PlaygroundController({children}: { children: React.ReactNode; }) {
  
  function parseCSS(inputvalues: { [key: string]: string }): void {
    console.log('// TODO parse CSS')
    for (const key in inputvalues) {
      if (Object.prototype.hasOwnProperty.call(inputvalues, key)) {
        // Process each key-value pair as needed
        // console.log(`${key}: ${inputvalues[key]}`);
      }
    }
  }

  return (
    <PlaygroundContext.Provider value={{parseCSS}}>
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundController