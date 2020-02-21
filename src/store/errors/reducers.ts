import { ADD_ERROR, POP_ERROR } from './constants';
import { ErrorsAction, ErrorsState } from './types';

// Initial state
const initial: ErrorsState = [];

// Reducer
const errorsReducer = (state = initial, action: ErrorsAction): ErrorsState => {
  switch (action.type) {
    case ADD_ERROR:
      return [...state, action.error];

    case POP_ERROR:
      return state.slice(1);

    default:
      return state;
  }
};

export default errorsReducer;