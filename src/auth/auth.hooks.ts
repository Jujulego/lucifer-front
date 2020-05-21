import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AppDispatch, AppState } from 'store';

import { login, logout } from './auth.actions';
import { Credentials } from './models/credentials';

// Types
interface LoginResponse {
  token: string
}

// Hooks
export function useToken() {
  return useSelector((state: AppState) => state.auth.token);
}

export function useLogin($login: Observable<Credentials>) {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // Effect
  useEffect(() => {
    const sub = $login
      .pipe(
        switchMap(creds => from(axios.post<LoginResponse>('/api/login', creds))),
        map(res => login(res.data.token))
      )
      .subscribe(a => dispatch(a));

    return () => sub.unsubscribe();
  }, [$login, dispatch]);
}

export function useLogout($logout: Observable<unknown>) {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // Effect
  useEffect(() => {
    const sub = $logout
      .pipe(
        switchMap(() => from(axios.delete('/api/logout'))),
        map(() => logout())
      )
      .subscribe(a => dispatch(a));

    return () => sub.unsubscribe();
  }, [$logout, dispatch]);
}
