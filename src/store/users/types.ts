import { Action } from 'redux';

import User from 'data/user';

import {
  ADD_USER, SET_USER, DEL_USER,
  LOADING_LIST, SET_LIST
} from './constants';

// State
export interface UserState {
  loading: boolean,
  user: User | null
}

export interface UserListState {
  loading: boolean,
  users: User[] | null
}

export type UsersState = {
  list: UserListState,
  some: { [id: string]: UserState }
}

// Actions
interface UserAction<A> extends Action<A> { id: string }

interface SetUserAction extends UserAction<typeof SET_USER> { user: User }
interface SetListAction extends Action<typeof SET_LIST> { users: User[] }

export type UsersAction =
  UserAction<typeof ADD_USER | typeof DEL_USER> | SetUserAction |
  Action<typeof LOADING_LIST> | SetListAction;