import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Token from 'data/token';
import User, { Credentials } from 'data/user';
import { AppState } from 'store';
import { globalReset } from 'store/actions';

import { loginAction, logoutAction, setError } from './actions';
import { authError } from './utils';

// Types
export type LoginToken = Pick<Token, '_id'> & { token: string, user: User['_id'] };

// Thunks
export const login = (credentials: Credentials) =>
  async (dispatch: Dispatch) => {
    try {
      // Make login request
      const res = await axios.post<LoginToken>('/api/login', credentials);
      const data = res.data;

      // Set auth header
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Store token & user
      await dispatch(loginAction(data.token, data._id, data.user));

    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(setError(error.response.data.error));
        return;
      }

      console.error(error);
      throw error;
    }
  };

export const logout = () =>
  async (dispath: Dispatch, getState: () => AppState) => {
    try {
      // Get token
      const token = getState().auth.token;
      if (!token) return;

      // Make logout request
      await axios.delete('/api/logout');

      // Remove token & user
      await dispath(logoutAction());
      await dispath(globalReset());

      // Remove auth header
      delete axios.defaults.headers.common['Authorization'];

    } catch (error) {
      if (authError(error, dispath)) return;
      console.log(error);
      throw error;
    }
  };

export const signIn = (credentials: Credentials, shouldLogin: boolean = true) =>
  async (dispatch: ThunkDispatch<AppState, {}, any>) => {
    try {
      // Make sign-in request
      await axios.post<User>('/api/signin', credentials);
      if (shouldLogin) await dispatch(login(credentials));

    } catch (error) {
      console.error(error);
      throw error;
    }
  };