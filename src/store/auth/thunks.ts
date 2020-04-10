import axios from 'axios';

import Token from 'data/token';
import User, { Credentials } from 'data/user';
import { AppState, AppDispatch, AppThunk } from 'store';
import { globalReset } from 'store/actions';

import { loginAction, logoutAction, setError } from './actions';
import { authError } from './utils';
import { httpError } from 'store/errors/utils';

// Types
export type LoginToken = Pick<Token, '_id'> & { token: string, user: User['_id'] };

// Thunks
export const login = (credentials: Credentials): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Make login request
      const res = await axios.post<LoginToken>('/api/users/login', { ...credentials, tags: ['Front'] });
      const data = res.data;

      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Store token & user
      dispatch(loginAction(data.token, data._id, data.user));

    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(setError(error.response.data.error));
        return;
      }

      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const logout = (): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      // Get token
      const token = getState().auth.token;
      if (!token) return;

      // Make logout request
      await axios.delete('/api/logout');

      // Remove token & user
      dispatch(logoutAction());
      dispatch(globalReset());

      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const signIn = (credentials: Credentials, shouldLogin: boolean = true): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Make sign-in request
      await axios.post<User>('/api/users/signin', credentials);
      if (shouldLogin) await dispatch(login(credentials));

    } catch (error) {
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };
