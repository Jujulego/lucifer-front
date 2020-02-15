import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';

import {
  ADD_USER, DEL_USER, SET_USER,
  LOADING_LIST, SET_LIST
} from './constants';
import { UserListState, UsersAction, UsersState, UserState } from './types';

// Initial
const initialList: UserListState = {
  loading: false,
  users: null
};

const initialUser: UserState = {
  loading: false,
  user: null
};

const initial: UsersState = {
  list: initialList,
  some: {}
};

// Reducers
const userReducer = (state = initialUser, action: UsersAction): UserState => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: null, loading: true };

    case SET_USER:
      return { ...state, user: action.user, loading: false };

    default:
      return state;
  }
};

const userListReducer = (state = initialList, action: UsersAction): UserListState => {
  switch (action.type) {
    case LOADING_LIST:
      return { ...state, loading: true, users: null };

    case SET_LIST:
      return { ...state, loading: false, users: action.users };

    default:
      return state;
  }
};

const usersReducer = (state = initial, action: UsersAction | GlobalAction): UsersState => {
  switch (action.type) {
    case GLOBAL_RESET:
      return initial;

    case ADD_USER:
    case SET_USER: {
      const { [action.id]: user, ...others } = state.some;
      return { ...state, some: { [action.id]: userReducer(user, action), ...others } };
    }

    case DEL_USER: {
      const { [action.id]: _, ...others } = state.some;
      return { ...state, some: others };
    }

    case LOADING_LIST:
    case SET_LIST:
      return { ...state, list: userListReducer(state.list, action) };

    default:
      return state;
  }
};

export default usersReducer;