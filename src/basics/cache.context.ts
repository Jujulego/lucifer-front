import { createContext, useCallback, useContext } from 'react';

// Types
export interface CacheState<R = any> {
  data?: R;
}

export interface CacheContextProps {
  cache: { [id: string]: CacheState; };
  set: <R> (id: string, data: R) => void;
}

export interface CacheProps<R> extends CacheState<R> {
  setCache: (data: R) => void;
}

// Defaults
const cacheDefaults: CacheContextProps = {
  cache: {},
  set: () => {}
};

// Context
export const CacheContext = createContext(cacheDefaults);

// Hook
export function useCache<R>(id: string): CacheProps<R> {
  const { cache, set } = useContext(CacheContext);

  return {
    ...cache[id],
    setCache: useCallback((data: R) => set(id, data), [set, id])
  };
}
