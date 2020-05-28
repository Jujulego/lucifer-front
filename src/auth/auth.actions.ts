import { Action } from 'redux';

import { BoolAction, bool_ac } from 'utils/actions/bool';

import { User } from './models/user';

// Constants
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_POPUP   = 'AUTH_POPUP';
export const AUTH_LOGIN   = 'AUTH_LOGIN';
export const AUTH_LOGOUT  = 'AUTH_LOGOUT';

// Actions
// - loading
export type AuthLoading = BoolAction<typeof AUTH_LOADING>;
export const _loading = bool_ac<typeof AUTH_LOADING>(AUTH_LOADING);

// - popup
export type AuthPopup = BoolAction<typeof AUTH_POPUP>;
export const _popup = bool_ac<typeof AUTH_POPUP>(AUTH_POPUP);

// - login
export type AuthLoginAction = Action<typeof AUTH_LOGIN> & { token: string, user: User };
export const _login = (token: string, user: User): AuthLoginAction => ({
  type: AUTH_LOGIN, token, user
});

// - logout
export type AuthLogoutAction = Action<typeof AUTH_LOGOUT>;
export const _logout = (): AuthLogoutAction => ({
  type: AUTH_LOGOUT
});

// Aliases
export type AuthAction = AuthLoading | AuthPopup | AuthLoginAction | AuthLogoutAction;
