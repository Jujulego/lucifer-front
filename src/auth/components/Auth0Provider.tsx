import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import createAuth0Client, {
  Auth0Client, Auth0ClientOptions,
  GetIdTokenClaimsOptions, GetTokenSilentlyOptions, GetTokenWithPopupOptions,
  PopupLoginOptions, RedirectLoginOptions, LogoutOptions
} from '@auth0/auth0-spa-js';

import { Auth0Context } from '../auth0.context';

// Types
export interface Auth0ProviderProps extends Auth0ClientOptions {
  children: ReactNode;
  onRedirectCallback: (result: any) => void;
}

// Components
const Auth0Provider = (props: Auth0ProviderProps) => {
  // Props
  const {
    children,
    onRedirectCallback = () => window.history.replaceState({}, document.title, window.location.pathname),
    ...options
  } = props;

  // State
  const [auth0,     setAuth0]   = useState<Auth0Client>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,   setLoading] = useState(false);
  const [popupOpen, setPopup]   = useState(false);
  const [user,      setUser]    = useState<any>(null);

  // Effects
  useEffect(() => {
    (async () => {
      const client = await createAuth0Client(options);
      setAuth0(client);

      // In callback
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        const { appState } = await client.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await client.getUser();
        setUser(user);
      }

      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const loginWithPopup = useCallback(async (options: PopupLoginOptions = {}) => {
    if (!auth0) return;
    setPopup(true);

    try {
      await auth0.loginWithPopup(options);

      const user = await auth0.getUser();
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setPopup(false);
    }
  }, [auth0]);

  const loginWithRedirect = useCallback(async (options?: RedirectLoginOptions) => {
    if (!auth0) return;
    await auth0.loginWithRedirect(options)
  }, [auth0]);

  const logout = useCallback(async (options?: LogoutOptions) => {
    if (!auth0) return;
    await auth0.logout(options)
  }, [auth0]);

  const handleRedirectCallback = useCallback(async () => {
    if (!auth0) return;

    setLoading(true);

    try {
      await auth0.handleRedirectCallback();

      const user = await auth0.getUser();
      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [auth0]);

  const getIdTokenClaims = useCallback(async (options?: GetIdTokenClaimsOptions) => {
    return await auth0!.getIdTokenClaims(options)
  }, [auth0]);

  const getTokenSilently = useCallback(async (options?: GetTokenSilentlyOptions) => {
    return await auth0!.getTokenSilently(options)
  }, [auth0]);

  const getTokenWithPopup = useCallback(async (options?: GetTokenWithPopupOptions) => {
    return await auth0!.getTokenWithPopup(options)
  }, [auth0]);

  // Render
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        loginWithRedirect,
        logout,
        handleRedirectCallback,
        getIdTokenClaims,
        getTokenSilently,
        getTokenWithPopup
      }}
    >
      { children }
    </Auth0Context.Provider>
  );
};

export default Auth0Provider;
