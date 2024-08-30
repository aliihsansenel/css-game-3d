import { createContext, useState } from 'react'
import { Level } from '../data/levels';
import { toCamelCase } from '../utils/helper';
import { QuizQuestion } from '../data/levels.d';

// export type WritableFlexProps = {
//   -readonly [K in Exclude<keyof R3FlexProps, 'flexBasis' | 'basis' | 'flexGrow' | 'grow' | 'flexShrink' | 'shrink'>]: R3FlexProps[K];
// };

// export interface WritableFlexProps {
//   justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between' | 'space-evenly' | 'space-around';
//   alignItems?: 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
// }

export type WritableFlexProps = { [key: string]: string } | Record<string, never>;

export interface PlaygroundContextType {
  parseCSS: (inputvalues: { [key: string]: string }) => void;
  flexProps: { [key: string]: string } | Record<string, never>;
  quizData: QuizQuestion;
}

export const PlaygroundContext = createContext<PlaygroundContextType | null>(null);

interface PlaygroundControllerProps {
  children: React.ReactNode;
  quizData: QuizQuestion;
}

function PlaygroundController({children, quizData}: PlaygroundControllerProps) {
  const initialProps = Level.initialPropState(quizData) as WritableFlexProps;
  const [flexProps, setFlexProps] = useState<WritableFlexProps>(initialProps);
  
  function parseCSS(inputvalues: Record<string, string>): void {
    const newFlexProps: WritableFlexProps = { }; // Initialize with current flexProps
    for (const key in inputvalues) {
      if (Object.prototype.hasOwnProperty.call(inputvalues, key)) {
        if(key.startsWith('value')){
          const p = inputvalues[`prop-${key.split('value-')[1]}`] || null;
          if (p) {
            const camelCasedKey = toCamelCase(p) as keyof WritableFlexProps;
            if (camelCasedKey && inputvalues[key] in newFlexProps) {
              newFlexProps[camelCasedKey] = inputvalues[key] as WritableFlexProps[typeof camelCasedKey];
            }
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