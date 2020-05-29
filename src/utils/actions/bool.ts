import { Action } from 'redux';

// Actions
interface TrueAction<A> extends Action<A> {
  kind: 'true'
}

interface FalseAction<A> extends Action<A> {
  kind: 'false'
}

interface ToggleAction<A> extends Action<A> {
  kind: 'toggle'
}

export type BoolAction<A = any> = TrueAction<A> | FalseAction<A> | ToggleAction<A>;
type Kinds = BoolAction['kind']

// Creator
type Names = { [name in Kinds]: string };

export function bool_ac<A>(type: A) {
  return {
    true:   (): TrueAction<typeof type> => ({ type, kind: 'true' }),
    false:  (): FalseAction<typeof type> => ({ type, kind: 'false' }),
    toggle: (): ToggleAction<typeof type> => ({ type, kind: 'toggle' })
  }
}

// Reducer
export function boolReducer(state: boolean, action: BoolAction): boolean {
  switch (action.kind) {
    case 'true': return true;
    case 'false': return false;
    case 'toggle': return !state;
    default: return state;
  }
}
