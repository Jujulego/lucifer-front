import User from 'data/user';

import { ADD_USER, SET_USER, DEL_USER } from './constants';
import { UsersAction } from './types';

// Actions
export const addUserAction = (id: string): UsersAction => ({
  type: ADD_USER, id
});

export const setUserAction = (user: User): UsersAction => ({
  type: SET_USER, id: user._id, user
});

export const delUserAction = (id: string): UsersAction => ({
  type: DEL_USER, id
});