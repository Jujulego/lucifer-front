import { DocsState, DocAction, OtherAction } from 'utils/actions/doc';

import Token from 'data/token';
import User from 'data/user';

import { DOC_USER, ADD_USER_TOKEN } from './constants';

// State
export type UsersState = DocsState<User>;

// Actions
interface AddUserTokenAction extends OtherAction<typeof ADD_USER_TOKEN> {
  token: Token
}

export type UsersAction = DocAction<typeof DOC_USER, User> |
  AddUserTokenAction;
