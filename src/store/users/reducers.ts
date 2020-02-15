import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';

import { ADD_USER, DEL_USER, SET_USER } from './constants';
import { UsersAction, UsersState, UserState } from './types';

// Initial
const initial: UsersState = {};
const initialUser: UserState = {
  loading: false,
  user: null
};

// Reducers
const userReducer = (state = initialUser, action: UsersAction) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: null, loading: true };

    case SET_USER:
      return { ...state, user: action.user, loading: false };

    default:
      return state;
  }
};

const usersReducer = (state = initial, action: UsersAction | GlobalAction) => {
  switch (action.type) {
    case GLOBAL_RESET:
      return initial;

    case ADD_USER:
    case SET_USER: {
      const { [action.id]: user } = state;
      return { ...state, [action.id]: userReducer(user, action) }
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