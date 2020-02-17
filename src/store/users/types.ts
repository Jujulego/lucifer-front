import { Action } from 'redux';

import User from 'data/user';

import { ADD_USER, SET_USER, DEL_USER } from './constants';

// State
export interface UserState {
  loading: boolean,
  user: User | null
}

export type UsersState = { [id: string]: UserState };

// Actions
interface UserAction<A> extends Action<A> { id: string }
interface SetUserAction extends UserAction<typeof SET_USER> { user: User }

export type UsersAction =
  UserAction<typeof ADD_USER | typeof DEL_USER> | SetUserAction;