import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { LOGIN, LOGOUT } from './constants';
import { AuthAction, AuthState } from './types';
import { PersistConfig } from 'redux-persist/es/types';

// Persist config
const config: PersistConfig<AuthState> = {
  key: 'auth',
  whitelist: ['token', 'user'],
  storage
};

// Initial state
const initial: AuthState = {};

// Reducer
function authReducer(state = initial, action: AuthAction) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token, user: action.user };

    case LOGOUT: {
      const { token, user, ...others } = state;
      return others;
    }

    default:
      return state;
  }
}

export default persistReducer(config, authReducer as Reducer<AuthState>);