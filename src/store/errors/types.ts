import { Action } from 'redux';

import { ADD_ERROR, POP_ERROR } from 'store/errors/constants';

// State
export type ErrorsState = string[];

// Actions
interface AddError extends Action<typeof ADD_ERROR> {
  error: string
}

export type ErrorsAction = AddError | Action<typeof POP_ERROR>;