import { createContext, useContext } from 'react';
import { PopupLoginOptions, RedirectLoginOptions, LogoutOptions } from '@auth0/auth0-spa-js';

import { AuthState } from './auth.reducer';

// Type
export type AuthContextProps = AuthState & {
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
}

// Defaults
const authDefaults: AuthContextProps = {
  loading: false,
  popup: false,
  isLogged: false,
  token: null,
  user: null,
  loginWithPopup: async () => {},
  loginWithRedirect: async () => {},
  logout: async () => {},
};

// Context
export const AuthContext = createContext<AuthContextProps>(authDefaults);

// Hook
export function useAuth() {
  return useContext(AuthContext);
}
