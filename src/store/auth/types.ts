import { Action } from 'redux';

import { SetAction } from 'utils/actions/set';

import { LOGIN, LOGOUT, SET_ERROR } from './constants';

// State
export interface AuthState {
  error?: string,
  token?: string,
  user?: string,
}

// Actions
interface LoginAction extends Action<typeof LOGIN> {
  token: string, user: string
}

export type AuthAction = LoginAction | Action<typeof LOGOUT> |
  SetAction<typeof SET_ERROR, AuthState['error']>;