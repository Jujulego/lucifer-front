import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateEvent } from 'contexts/EventContext';

import Daemon from 'data/daemon';

import { AppDispatch, AppState } from 'store';

import { getDaemon } from './thunks';
import { setDaemonAction } from './actions';

// Hooks
export function useDaemon(id: string | undefined, load: boolean = true): Daemon | null {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: AppState) =>
    id ? state.daemons[id] : null
  );

  // Load daemon if needed
  useEffect(() => {
    if (!id || !load) return;
    if (state?.doc || state?.loading) return;

    dispatch(getDaemon(id));
  }, [dispatch, id, state, load]);

  // Callbacks
  const update = useCallback((daemon: Daemon) => {
    dispatch(setDaemonAction(daemon))
  }, [dispatch]);

  // Events
  useUpdateEvent(state?.doc?.lrn, update);

  // Return user
  return state ? state.doc : null;
}
