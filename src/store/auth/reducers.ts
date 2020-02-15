import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { LOGIN, LOGOUT, SET_ERROR } from './constants';
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
    case LOGIN: {
      const { error, ...others } = state;
      return { ...others, token: action.token, user: action.user };
    }

    case LOGOUT: {
      const { token, user, error, ...others } = state;
      return others;
    }

    case SET_ERROR:
      return { ...state, error: action.value };

    default:
      return state;
  }
}

export default persistReducer(config, authReducer as Reducer<AuthState>);