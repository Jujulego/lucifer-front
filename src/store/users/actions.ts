import User from 'data/user';

import Token from 'data/token';

import { ADD_USER, ADD_USER_TOKEN, DEL_USER, SET_USER } from './constants';
import { UsersAction } from './types';

// Actions
export const addUserAction = (id: string): UsersAction => ({
  type: ADD_USER, id
});

export const addUserTokenAction = (id: string, token: Token): UsersAction => ({
  type: ADD_USER_TOKEN, id, token
});

export const setUserAction = (user: User): UsersAction => ({
  type: SET_USER, id: user._id, user
});

export const delUserAction = (id: string): UsersAction => ({
  type: DEL_USER, id
});