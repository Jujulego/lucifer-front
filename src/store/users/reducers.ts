import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';

import { ADD_USER, ADD_USER_TOKEN, DEL_USER, SET_USER } from './constants';
import { UsersAction, UsersState, UserState } from './types';

// Initial
const initialUser: UserState = {
  loading: false,
  user: null
};

const initial: UsersState = {};

// Reducers
const userReducer = (state = initialUser, action: UsersAction): UserState => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, loading: true };

    case ADD_USER_TOKEN: {
      const { user } = state;
      if (!user) return state;

      return {
        ...state,
        user: {
          ...user,
          tokens: [...user.tokens, action.token]
        }
      };
    }

    case SET_USER: {
      const { user } = state;
      if (user && user.__v > action.user.__v) return state;

      return { ...state, user: action.user, loading: false };
    }

    default:
      return state;
  }
};

const usersReducer = (state = initial, action: UsersAction | GlobalAction): UsersState => {
  switch (action.type) {
    case GLOBAL_RESET:
      return initial;

    case ADD_USER:
    case ADD_USER_TOKEN:
    case SET_USER: {
      const { [action.id]: user } = state;
      return { ...state, [action.id]: userReducer(user, action) };
    }

    case DEL_USER: {
      const { [action.id]: _, ...others } = state;
      return others;
    }

    default:
      return state;
  }
};

export default usersReducer;