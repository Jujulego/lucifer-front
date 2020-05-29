import { ERRORS_ADD_ERROR, ERRORS_POP_ERROR, ErrorsAction } from './errors.actions';

// State
export type ErrorsState = string[];

// Reducer
const initial: ErrorsState = [];

export const reducer = (state: ErrorsState = initial, action: ErrorsAction): ErrorsState => {
  switch (action.type) {
    case ERRORS_ADD_ERROR:
      return [...state, action.error];

    case ERRORS_POP_ERROR:
      return state.slice(1);

    default:
      return state;
  }
}
