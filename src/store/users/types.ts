import { Action } from 'redux';

import Token from 'data/token';
import User from 'data/user';

import { ADD_USER, ADD_USER_TOKEN, SET_USER, DEL_USER } from './constants';

// State
export interface UserState {
  loading: boolean,
  user: User | null
}

export type UsersState = { [id: string]: UserState };

// Actions
interface UserAction<A> extends Action<A> { id: string }
interface SetUserAction extends UserAction<typeof SET_USER> { user: User }
interface AddUserTokenAction extends UserAction<typeof ADD_USER_TOKEN> { token: Token }

export type UsersAction =
  UserAction<typeof ADD_USER | typeof DEL_USER> |
  AddUserTokenAction | SetUserAction;