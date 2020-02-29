import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Daemon from 'data/daemon';
import { AppDispatch, AppState } from 'store';

import { getDaemon } from './thunks';

// Hooks
export function useDaemon(id: string | undefined): Daemon | null {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: AppState) =>
    id ? state.daemons[id] : null
  );

  // Load daemon if needed
  useEffect(() => {
    if (!id) return;
    if (state?.doc || state?.loading) return;

    dispatch(getDaemon(id));
  }, [dispatch, id, state]);

  // Return user
  return state ? state.doc : null;
}
