import { Action } from 'redux';

// Types
export interface SetAction<A, T extends any> extends Action<A> {
  readonly value: T
}

// Utils
export function set_ac<A, T extends any>(type: A) {
  return (value: T): SetAction<A, T> => ({ type, value });
}
