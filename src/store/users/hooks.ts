import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import User from 'data/user';
import { AppDispatch, AppState } from 'store';

import { getUser } from './thunks';
import { isAllowed, PermissionLevel, PermissionName } from 'data/permission';

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

export function usePermision(name: PermissionName, level: PermissionLevel): boolean {
  // User
  const user = useLoggedUser();
  return user ? isAllowed(user, name, level) : false;
}

export { PermissionLevel as Lvl };