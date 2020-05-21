import { useEffect, useRef } from 'react';
import { Subject } from 'rxjs';

// Hook
export function useSubject<T, S extends Subject<T> = Subject<T>>(subject: S): S {
  // Ref
  const ref = useRef<S>(subject);

  // Effect
  useEffect(() => {
    const subject = ref.current;
    return () => subject.complete();
  }, []);

  return ref.current;
}
