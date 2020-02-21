import { AppDispatch } from 'store';

import { addError } from './actions';

// Utils
export function httpError(error: any, dispatch: AppDispatch): boolean {
  if (error.response) {
    dispatch(addError(`${error.response.status}: ${error.response.data?.error || error.response.statusText}`));
    return true;
  }

  return false;
}