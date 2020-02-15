import { GLOBAL_RESET } from './constants';
import { GlobalAction } from './types';

// Actions
export const globalReset = (): GlobalAction => ({
  type: GLOBAL_RESET
});