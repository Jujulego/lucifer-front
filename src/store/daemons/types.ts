import { DocsState, DocAction, OtherAction } from 'utils/actions/doc';

import Token from 'data/token';
import Daemon from 'data/daemon';

import { DOC_DAEMON, ADD_DAEMON_TOKEN } from './constants';

// State
export type DaemonsState = DocsState<Daemon>;

// Actions
interface AddUserTokenAction extends OtherAction<typeof ADD_DAEMON_TOKEN> {
  token: Token
}

export type DaemonsAction = DocAction<typeof DOC_DAEMON, Daemon> |
  AddUserTokenAction;
