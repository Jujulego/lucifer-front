import { createContext, useContext } from 'react';
import {
  IdToken,
  GetIdTokenClaimsOptions, GetTokenSilentlyOptions, GetTokenWithPopupOptions,
  PopupLoginOptions, RedirectLoginOptions, LogoutOptions
} from '@auth0/auth0-spa-js';

// Type
export interface Auth0ContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  popupOpen: boolean;
  user: any;
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  handleRedirectCallback: () => Promise<void>;
  getIdTokenClaims: (options?: GetIdTokenClaimsOptions) => Promise<IdToken>;
  getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>;
  getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
}

// Defaults
const auth0Defaults: Auth0ContextProps = {
  isAuthenticated: false,
  loading: false,
  popupOpen: false,
  user: null,
  loginWithPopup: async () => {},
  loginWithRedirect: async () => {},
  logout: async () => {},
  handleRedirectCallback: async () => {},
  getIdTokenClaims: async () => ({ __raw: '' }),
  getTokenSilently: async () => {},
  getTokenWithPopup: async () => '',
};

// Context
export const Auth0Context = createContext(auth0Defaults);

// Hook
export function useAuth0() {
  return useContext(Auth0Context);
}
