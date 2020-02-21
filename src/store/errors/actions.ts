import { ADD_ERROR, POP_ERROR } from './constants';
import { ErrorsAction } from './types';

// Actions
export const addError = (error: string): ErrorsAction => ({
  type: ADD_ERROR, error
});

export const popError = (): ErrorsAction => ({
  type: POP_ERROR
});