import { boolReducer } from 'utils/actions/bool';

import { AUTH_LOADING, AUTH_LOGIN, AUTH_LOGOUT, AUTH_POPUP, AuthAction } from './auth.actions';

// State
interface CommonState {
  loading: boolean;
  popup: boolean;
  isLogged: boolean;
}

interface LoggedState {
  isLogged: true;
  token: string;
  user: any;
}

interface NotLoggedState {
  isLogged: false;
  token: null;
  user: null;
}

export type AuthState = CommonState & (LoggedState | NotLoggedState);

// Reducer
const initial: AuthState = {
  loading: true,
  popup: false,
  isLogged: false,
  token: null,
  user: null
};

export const reducer = (state: AuthState = initial, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: boolReducer(state.loading, action)
      };

    case AUTH_POPUP:
      return {
        ...state,
        popup: boolReducer(state.popup, action)
      }

    case AUTH_LOGIN:
      return {
        ...state,
        isLogged: true,
        token: action.token
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: null,
        user: null
      };

    default:
      return state;
  }
};
