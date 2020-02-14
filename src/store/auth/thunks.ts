import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Token from 'data/token';
import User, { Credentials } from 'data/user';
import { AppState } from 'store/index';

import { loginAction, logoutAction } from './actions';
import { authHeaders } from './utils';

// Types
export type LoginToken = Pick<Token, '_id'> & { token: string, user: User['_id'] };

// Thunks
export const login = (credentials: Credentials) =>
  async (dispatch: Dispatch) => {
    try {
      // Make login request
      const res = await axios.post<LoginToken>('/api/login', credentials);
      const data = res.data;

      // Store token & user
      dispatch(loginAction(data.token, data.user));

    } catch (error) {
      console.error(error);
    }
  };

export const logout = () =>
  async (dispath: Dispatch, getState: () => AppState) => {
    try {
      // Get token
      const token = getState().auth.token;
      if (!token) return;

      // Make logout request
      await axios.delete('/api/logout', { headers: authHeaders(token)});

      // Remove token & user
      dispath(logoutAction());

    } catch (error) {
      console.log(error);
    }
  };

export const signIn = (credentials: Credentials, shouldLogin: boolean = true) =>
  async (dispatch: ThunkDispatch<AppState, {}, any>) => {
    try {
      // Make sign-in request
      await axios.post<User>('/api/user', credentials);
      if (shouldLogin) await dispatch(login(credentials));

    } catch (error) {
      console.error(error);
    }
  };