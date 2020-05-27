import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions, LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions
} from '@auth0/auth0-spa-js';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, AppState } from 'store';

import { _loading, _login, _logout } from '../auth.actions';
import { loginWithPopup, logout } from '../auth.thunks';
import { AuthContext, AuthContextProps } from '../auth.context';

// Types
export interface AuthGateProps extends Auth0ClientOptions {
  children: ReactNode;
  onRedirectCallback?: (state: any) => void;
}

// Component
const AuthGate = (props: AuthGateProps) => {
  // Props
  const {
    children,
    onRedirectCallback = () => window.history.replaceState({}, document.title, window.location.pathname),
    ...options
  } = props;

  // State
  const [auth0, setAuth0] = useState<Auth0Client>();

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: AppState) => state.auth);

  // Effects
  useEffect(() => {
    (async () => {
      // Create client
      const client = await createAuth0Client(options);
      setAuth0(client);

      // Is in callback ?
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        const { appState } = await client.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      // Is logged ?
      const isLogged = await client.isAuthenticated();

      if (isLogged) {
        const token = await client.getIdTokenClaims();
        const user = await client.getUser();

        dispatch(_login(token.__raw, user));
      } else {
        dispatch(_logout());
      }

      dispatch(_loading.false());
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Callbacks
  const context: AuthContextProps = { ...state,
    loginWithPopup: useCallback(async (options: PopupLoginOptions = {}) => {
      if (auth0) await dispatch(loginWithPopup(auth0, options));
    }, [auth0, dispatch]),
    loginWithRedirect: useCallback(async (options: RedirectLoginOptions = {}) => {
      if (auth0) await auth0.loginWithRedirect(options);
    }, [auth0]),
    logout: useCallback(async (options: LogoutOptions = {}) => {
      if (auth0) await dispatch(logout(auth0, options));
    }, [auth0, dispatch])
  };

  // Render
  if (state.loading) {
    return (
      <></>
    );
  }

  return (
    <AuthContext.Provider value={context as any}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthGate;
