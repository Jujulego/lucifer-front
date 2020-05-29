import { Auth0Client, LogoutOptions, PopupLoginOptions } from '@auth0/auth0-spa-js';

import { AppThunk } from 'app.store';

import { _loading, _login, _logout, _popup } from './auth.actions';

// Thunks
const login = (auth0: Auth0Client): AppThunk =>
  async (dispatch) => {
    const token = await auth0.getIdTokenClaims();
    const user = await auth0.getUser();

    dispatch(_login(token.__raw, user));
  }

export const setupAuth = (auth0: Auth0Client, redirectCallback: (state: any) => void): AppThunk =>
  async (dispatch) => {
    dispatch(_loading.true());

    // Is in callback ?
    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
      const { appState } = await auth0.handleRedirectCallback();
      redirectCallback(appState);
    }

    // Is logged ?
    const isLogged = await auth0.isAuthenticated();

    if (isLogged) {
      await dispatch(login(auth0));
    } else {
      dispatch(_logout());
    }

    dispatch(_loading.false());
  };

export const loginWithPopup = (auth0: Auth0Client, options: PopupLoginOptions): AppThunk =>
  async (dispatch) => {
    dispatch(_popup.true());

    try {
      // Login
      await auth0.loginWithPopup(options);
      await dispatch(login(auth0));

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
      await dispatch(login(auth0));

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
