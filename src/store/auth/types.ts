import { Action } from 'redux';

import { LOGIN, LOGOUT } from './constants';

// State
export interface AuthState {
  token?: string,
  user?: string,
}

// Actions
interface LoginAction extends Action<typeof LOGIN> {
  token: string, user: string
}

export type AuthAction = LoginAction | Action<typeof LOGOUT>;