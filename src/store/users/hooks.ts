import { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccessContext from 'contexts/AccessContext';
import User from 'data/user';
import { AppDispatch, AppState } from 'store';

import { getUser } from './thunks';
import { isAllowed, PLvl, PName } from 'data/permission';

// Hooks
export function useUser(id: string | undefined): User | null {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: AppState) =>
    id ? state.users[id] : null
  );

  // Load user if needed
  useEffect(() => {
    if (!id) return;
    if (state?.user || state?.loading) return;

    dispatch(getUser(id));
  }, [dispatch, id, state]);

  // Return user
  return state ? state.user : null;
}

export function useLoggedUser(): User | null {
  // Redux
  const id = useSelector((state: AppState) => state.auth.user);
  return useUser(id);
}

export function usePermision(name: PName, level: PLvl): boolean | null {
  // Context
  const { overrides } = useContext(AccessContext);

  // Memo
  const override = useMemo(
    () => overrides.some(o => (o.name === name) && ((o.level & level) !== 0)),
    [overrides, name, level]
  );

  // User
  const user = useLoggedUser();
  return override || (user ? isAllowed(user, name, level) : null);
}