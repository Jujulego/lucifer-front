import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppDispatch, AppState } from 'store';

import { login } from './auth.actions';
import { Credentials } from './models/credentials';

// Types
interface LoginResponse {
  token: string
}

// Hooks
export const useToken = () => {
  return useSelector((state: AppState) => state.auth.token);
}

export const useLogin = ($creds: Observable<Credentials>) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // Effect
  useEffect(() => {
    $creds
      .pipe(
        switchMap(creds => from(axios.post<LoginResponse>('/api/login', creds))),
        map(res => login(res.data.token))
      )
      .subscribe(dispatch)
  }, [$creds, dispatch]);
}
