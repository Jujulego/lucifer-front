import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import User from 'data/user';
import { AppState } from 'store/index';

import { getUser } from './thunks';
import { UserState } from './types';

// Hooks
export function useUser(id: string | undefined): User | null {
  // Redux
  const dispatch = useDispatch();
  const state = useSelector<AppState, UserState | null>((state: AppState) => id !== undefined ? state.users[id] : null);

  // Load user if needed
  const shouldLoad = !state || (!state.loading && !state.user);

  useEffect(() => {
    if (id && shouldLoad) {
      dispatch(getUser(id));
    }
  }, [dispatch, id, shouldLoad]);

  return state ? state.user : null;
}
