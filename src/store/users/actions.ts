import Token from 'data/token';
import User from 'data/user';

import { creators, otherAction } from 'utils/actions/doc';

import { ADD_USER_TOKEN, DOC_USER } from './constants';
import { UsersAction } from './types';

// Actions
export const addUserAction = creators.loading<UsersAction, typeof DOC_USER>(DOC_USER);
export const setUserAction = creators.set<UsersAction, typeof DOC_USER, User>(DOC_USER);
export const delUserAction = creators.del<UsersAction, typeof DOC_USER>(DOC_USER);

export const addUserTokenAction = (id: string, token: Token): UsersAction =>
  otherAction<UsersAction, typeof ADD_USER_TOKEN>({
    type: ADD_USER_TOKEN, id, token
  });
