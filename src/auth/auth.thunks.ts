import axios from 'axios';

import { AppThunk } from 'store';

import { _login, _logout } from './auth.actions';
import { Credentials } from './models/credentials';

// Types
interface RLogin {
  token: string
}

// Thunks
export const login = (creds: Credentials): AppThunk =>
  async (dispatch) => {
    // Request login
    const res = await axios.post<RLogin>('/api/login', creds);

    // Save token
    dispatch(_login(res.data.token));
  };

export const logout = (): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();

    // Request login
    await axios.delete('/api/logout', {
      headers: {
        AUTHORIZATION: `Bearer ${state.auth.token}`
      }
    });

    // Save token
    dispatch(_logout());
  };
