import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'store';

import { login, logout } from './auth.thunks';
import { Credentials } from './models/credentials';

// Hooks
export function useToken() {
  return useSelector((state: AppState) => state.auth.token);
}

export function useLogin() {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  return (creds: Credentials) => dispatch(login(creds));
}

export function useLogout() {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  return () => dispatch(logout());
}
