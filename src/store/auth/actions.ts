import { setActionCreator } from 'utils/actions/set';

import { LOGIN, LOGOUT, SET_ERROR } from './constants';
import { AuthAction } from './types';

// Actions
export const loginAction = (token: string, tokenId: string, user: string): AuthAction => ({
  type: LOGIN, token, tokenId, user
});

export const logoutAction = (): AuthAction => ({
  type: LOGOUT
});

export const setError = setActionCreator<AuthAction, typeof SET_ERROR>(SET_ERROR);