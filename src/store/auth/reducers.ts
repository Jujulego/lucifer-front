import { Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SET_TOKEN, SET_USER } from './constants';
import { AuthState, AuthAction } from './types';
import { PersistConfig } from 'redux-persist/es/types';

// Persist config
const config: PersistConfig<AuthState> = {
  key: 'auth',
  whitelist: ['token'],
  storage
};

// Initial state
const initial: AuthState = {};

// Reducer
function authReducer(state = initial, action: AuthAction) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.value };

    case SET_USER:
      return { ...state, user: action.value };

    default:
      return state;
  }
}

export default persistReducer(config, authReducer as Reducer<AuthState>);