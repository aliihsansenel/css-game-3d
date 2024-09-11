import { WritableFlexProps } from "../controllers/PlaygroundController";

export function debounce<T extends (...args: unknown[]) => void>(callback: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export function debounceAndClear<T extends (...args: unknown[]) => void>(callback: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = function(...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Return both the debounced function and a function to clear the timeout
  return {
    debouncedFunction,
    clear: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }
  };
}

export const debounce2 = <T extends (...args: unknown[]) => void>(fn: T, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function toCamelCase(cssProperty: string): keyof WritableFlexProps {
  return cssProperty.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof WritableFlexProps;
}
