import { useDispatch, useSelector } from 'react-redux';
import { PopupLoginOptions, RedirectLoginOptions, LogoutOptions } from '@auth0/auth0-spa-js';

import { AppDispatch, AppState } from 'store';

import { AuthState } from './auth.reducer';

// Type
export type AuthHookReturn = AuthState & {
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
};

// Hooks
export function useAuth() {
}
