import { GLOBAL_RESET } from 'store/constants';
import { GlobalAction } from 'store/types';
import { docsReducer, OtherAction } from 'utils/actions/doc';

import Daemon from 'data/daemon';

import { DOC_DAEMON, ADD_DAEMON_TOKEN } from './constants';
import { DaemonsAction, DaemonsState } from './types';

// Initial
const initial: DaemonsState = {};

// Reducers
const daemonReducer = (state: Daemon, action: Extract<DaemonsAction, OtherAction>): Daemon => {
  switch (action.type) {
    case ADD_DAEMON_TOKEN: {
      return {
        ...state,
        tokens: [...state.tokens, action.token]
      };
    }

    default:
      return state;
  }
};

const daemonsReducer = (state = initial, action: DaemonsAction | GlobalAction): DaemonsState => {
  switch (action.type) {
    case GLOBAL_RESET:
      return initial;

    case DOC_DAEMON:
    case ADD_DAEMON_TOKEN:
      return docsReducer(state, action, daemonReducer);

    default:
      return state;
  }
};

export default daemonsReducer;
