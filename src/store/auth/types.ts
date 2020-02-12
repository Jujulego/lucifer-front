import { SetAction } from 'utils/actions/set';

import { SET_TOKEN, SET_USER } from './constants';

// State
export interface AuthState {
  token?: string,
  user?: string,
}

// Actions
export type AuthAction =
  SetAction<typeof SET_TOKEN, AuthState['token']> |
  SetAction<typeof SET_USER, AuthState['user']>