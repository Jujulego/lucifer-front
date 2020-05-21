import { Action } from 'redux';

// Constants
export const AUTH_LOGIN  = 'auth/LOGIN';
export const AUTH_LOGOUT = 'auth/LOGOUT';

// Actions
// - login
export type LoginAction = Action<typeof AUTH_LOGIN> & { token: string };
export const login = (token: string): LoginAction => ({
  type: AUTH_LOGIN, token
});

// - logout
export type LogoutAction = Action<typeof AUTH_LOGOUT>;
export const logout = (): LogoutAction => ({
  type: AUTH_LOGOUT
});

// Aliases
export type AuthAction = LoginAction | LogoutAction;
