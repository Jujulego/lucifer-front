import { Auth0Client, LogoutOptions, PopupLoginOptions } from '@auth0/auth0-spa-js';

import { AppThunk } from 'store';

import { _loading, _login, _logout, _popup } from './auth.actions';

// Thunks
export const loginWithPopup = (auth0: Auth0Client, options: PopupLoginOptions): AppThunk =>
  async (dispatch) => {
    dispatch(_popup.true());

    try {
      // Login
      await auth0.loginWithPopup(options);

      // Save token
      const token = await auth0.getIdTokenClaims();
      const user = await auth0.getUser();

      dispatch(_login(token.__raw, user));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(_popup.false());
    }
  };

export const handleRedirectCallback = (auth0: Auth0Client): AppThunk =>
  async (dispatch) => {
    dispatch(_loading.true());

    try {
      // Login
      await auth0.handleRedirectCallback();

      // Save token
      const token = await auth0.getIdTokenClaims();
      const user = await auth0.getUser();

      dispatch(_login(token.__raw, user));
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(_loading.false());
    }
  };

export const logout = (auth0: Auth0Client, options: LogoutOptions): AppThunk =>
  async (dispatch) => {
    await auth0.logout(options);
    dispatch(_logout());
  };
