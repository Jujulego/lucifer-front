import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';
import { docsReducer, OtherAction } from 'utils/actions/doc';

import User from 'data/user';

import { DOC_USER, ADD_USER_TOKEN } from './constants';
import { UsersAction, UsersState } from './types';

// Initial
const initial: UsersState = {};

// Reducers
const userReducer = (state: User, action: Extract<UsersAction, OtherAction>): User => {
  switch (action.type) {
    case ADD_USER_TOKEN: {
      return {
        ...state,
        tokens: [...state.tokens, action.token]
      };
    }

    default:
      return state;
  }
};

const usersReducer = (state = initial, action: UsersAction | GlobalAction): UsersState => {
  switch (action.type) {
    case GLOBAL_RESET:
      return initial;

    case DOC_USER:
    case ADD_USER_TOKEN:
      return docsReducer(state, action, userReducer);

    default:
      return state;
  }
};

export default usersReducer;
