import { Action } from 'redux';

// Constants
export const ERRORS_ADD_ERROR = 'ERRORS_ADD_ERROR';
export const ERRORS_POP_ERROR = 'ERRORS_POP_ERROR';

// Actions
// - add error
export type ErrorsAddErrorAction = Action<typeof ERRORS_ADD_ERROR> & { error: string };
export const _addError = (error: string): ErrorsAddErrorAction => ({
  type: ERRORS_ADD_ERROR, error
});

// - pop error
export type ErrorsPopErrorAction = Action<typeof ERRORS_POP_ERROR>;
export const _popError = (): ErrorsPopErrorAction => ({
  type: ERRORS_POP_ERROR
});

// Aliases
export type ErrorsAction = ErrorsAddErrorAction | ErrorsPopErrorAction;
