import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist/es/types';

import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';

import { LOGIN, LOGOUT, SET_ERROR } from './constants';
import { AuthAction, AuthState } from './types';

// Persist config
const config: PersistConfig<AuthState> = {
  key: 'auth',
  whitelist: ['token', 'tokenId', 'user'],
  storage
};

// Initial state
const initial: AuthState = {};

// Reducer
const authReducer = persistReducer(config, (state = initial, action: AuthAction | GlobalAction) => {
  switch (action.type) {
    case GLOBAL_RESET: {
      const { error, ...others } = state;
      return others;
    }

    case LOGIN: {
      const { error, ...others } = state;
      return {
        ...others,
        token: action.token, tokenId: action.tokenId,
        user: action.user
      };
    }

    case LOGOUT: {
      const { token, tokenId, user, error, ...others } = state;
      return others;
    }

    case SET_ERROR:
      return { ...state, error: action.value };

    default:
      return state;
  }
});

export default authReducer;