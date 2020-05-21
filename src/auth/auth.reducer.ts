import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';

import { AuthAction, AUTH_LOGIN, AUTH_LOGOUT } from './auth.actions';

// Persist
const config: PersistConfig<AuthState> = {
  key: 'auth',
  whitelist: ['token'],
  storage
}

// State
export interface AuthState {
  token?: string;
}

const initial: AuthState = {}

// Reducer
export const reducer = persistReducer(config,
  (state = initial, action: AuthAction) => {
    switch (action.type) {
      case AUTH_LOGIN:
        return { ...state, token: action.token };

      case AUTH_LOGOUT: {
        const { token, ...others } = state;
        return others;
      }

      default:
        return state;
    }
  }
);
