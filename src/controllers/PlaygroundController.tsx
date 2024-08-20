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

interface PlaygroundControllerProps {
  children: React.ReactNode;
  level: Level;
}

function PlaygroundController({children, level}: PlaygroundControllerProps) {
  const [flexProps, setFlexProps] = useState<FlexPropsKeys>((level.initialPropState()));
  
  function parseCSS(inputvalues: { [key: string]: string }): void {
    const newFlexProps: FlexPropsKeys = {};
    for (const key in inputvalues) {
      if (Object.prototype.hasOwnProperty.call(inputvalues, key)) {
        if(key.startsWith('value')){
          const p = inputvalues[`prop-${key.split('value-')[1]}`] || null;
          if (p) {
            const camelCasedKey = toCamelCase(p) as keyof R3FlexProps;
            newFlexProps[camelCasedKey] = inputvalues[key]; 
          } 
        }
      }
    }
    setFlexProps(newFlexProps);
  }
  return (
    <PlaygroundContext.Provider value={{level, parseCSS, flexProps}}>
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundController