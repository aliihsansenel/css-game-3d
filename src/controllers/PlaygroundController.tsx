import { createContext, useState } from 'react'
import { Level } from '../data/levels';
import { R3FlexProps } from '@react-three/flex';
import { toCamelCase } from '../utils/helper';
import { QuizQuestion } from '../data/levels';

type FlexPropsKeys = Partial<{
  [K in keyof R3FlexProps]: string;
}>;

export interface PlaygroundContextType {
  parseCSS: (inputvalues: { [key: string]: string }) => void;
  flexProps: FlexPropsKeys;
  quizData: QuizQuestion;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

interface PlaygroundControllerProps {
  children: React.ReactNode;
  quizData: QuizQuestion;
}

function PlaygroundController({children, quizData}: PlaygroundControllerProps) {
  const [flexProps, setFlexProps] = useState<FlexPropsKeys>((Level.initialPropState(quizData)));
  
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
    <PlaygroundContext.Provider value={{parseCSS, flexProps, quizData}}>
      {children}
    </PlaygroundContext.Provider>
  )
}

export default PlaygroundController