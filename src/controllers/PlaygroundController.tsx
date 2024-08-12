import { createContext, useState } from 'react'
import { Level } from '../data/levels';
import { R3FlexProps } from '@react-three/flex';
import { toCamelCase } from '../utils/helper';

type FlexPropsKeys = Partial<{
  [K in keyof R3FlexProps]: string;
}>;

export interface PlaygroundContextType {
  parseCSS: (inputvalues: { [key: string]: string }) => void;
  level: Level;
  flexProps: FlexPropsKeys;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

function PlaygroundController({children}: { children: React.ReactNode; }) {
  const [level, setLevel] = useState(new Level('l0'));
  
  const flexProps: FlexPropsKeys = {};
  function parseCSS(inputvalues: { [key: string]: string }): void {
    console.log('// TODO parse CSS');
    
    for (const key in inputvalues) {
      if (Object.prototype.hasOwnProperty.call(inputvalues, key)) {
        const camelCasedKey = toCamelCase(key) as keyof R3FlexProps; // Ensure the key is a valid R3FlexProps key
        flexProps[camelCasedKey] = inputvalues[key]; 
      }
    }
  }
  return (
    <PlaygroundContext.Provider value={{level, parseCSS, flexProps}}>
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundController