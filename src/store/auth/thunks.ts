import axios from 'axios';
import { Dispatch } from 'redux';

import User, { Credentials } from 'data/user';
import Token from 'data/token';

import { setToken, setUser } from './actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/index';

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
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

    } catch (error) {
      console.error(error);
    }
  };

export const signIn = (credentials: Credentials, shouldLogin: boolean = true) =>
  async (dispatch: ThunkDispatch<AppState, {}, any>) => {
    try {
      // Make sign-in request
      await axios.post<User>('/api/user', credentials);
      if (shouldLogin) dispatch(login(credentials));

    } catch (error) {
      console.error(error);
    }
  };