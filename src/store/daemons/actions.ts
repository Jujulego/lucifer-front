import Token from 'data/token';
import Daemon from 'data/daemon';

import { creators, otherAction } from 'utils/actions/doc';

import { ADD_DAEMON_TOKEN, DOC_DAEMON } from './constants';
import { DaemonsAction } from './types';

// Actions
export const addDaemonAction = creators.loading<DaemonsAction, typeof DOC_DAEMON>(DOC_DAEMON);
export const setDaemonAction = creators.set<DaemonsAction, typeof DOC_DAEMON, Daemon>(DOC_DAEMON);
export const delDaemonAction = creators.del<DaemonsAction, typeof DOC_DAEMON>(DOC_DAEMON);

export const addDaemonTokenAction = (id: string, token: Token): DaemonsAction =>
  otherAction<DaemonsAction, typeof ADD_DAEMON_TOKEN>({
    type: ADD_DAEMON_TOKEN, id, token
  });
