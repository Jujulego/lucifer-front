import { Action } from 'redux';

import { GLOBAL_RESET } from './constants';

// Actions
export type GlobalAction = Action<typeof GLOBAL_RESET>;