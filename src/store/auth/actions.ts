import { LOGIN, LOGOUT } from './constants';
import { AuthAction } from './types';

// Actions
export const loginAction = (token: string, user: string): AuthAction => ({
  type: LOGIN, token, user
});

export const logoutAction = (): AuthAction => ({
  type: LOGOUT
});