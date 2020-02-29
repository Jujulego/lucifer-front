import { Action } from 'redux';

import Document, { AnyDocument } from 'data/document';

// State
export interface DocState<T extends Document> {
  loading: boolean;
  doc: T | null;
}

export type DocsState<T extends Document> = { [id: string]: DocState<T> };

// Actions
interface BaseDocAction<A = any> extends Action<A> {
  id: string;
}

interface LoadingAction<A> extends BaseDocAction<A> {
  kind: 'loading';
}

interface SetAction<A, T extends Document> extends BaseDocAction<A> {
  kind: 'set'; doc: T;
}

interface DelAction<A> extends BaseDocAction<A> {
  kind: 'del';
}

export interface OtherAction<OA = any> extends BaseDocAction<OA> {
  kind: 'other';
}

export type AnyOtherAction = OtherAction & {
  [extra in string | number | symbol]: any;
}

export type DocAction<A = any, T extends Document = Document & AnyDocument>
  = LoadingAction<A> | SetAction<A, T> | OtherAction<A> | DelAction<A>;

// Action Creators
export const creators = {
  loading: <As extends Action, A extends As['type']>(type: A) =>
    (id: string): LoadingAction<A> => ({ type, kind: 'loading', id }),

  set: <As extends Action, A extends As['type'], T extends Document>(type: A) =>
    (doc: T): SetAction<A, T> => ({ type, kind: 'set', id: doc._id, doc }),

  del: <As extends Action, A extends As['type']>(type: A) =>
    (id: string): DelAction<A> => ({ type, kind: 'del', id }),
};

export function otherAction<As extends Action, A extends As['type']>(action: Omit<Extract<As, Action<A>>, 'kind'>) {
  return { ...action, kind: 'other' as 'other' };
}

// Initial
const initial: DocState<AnyDocument & Document> = {
  loading: false, doc: null
};

// Reducers
type OtherReducer<T extends Document> = (state: T, action: AnyOtherAction) => T;

export function docReducer<T extends Document>(state: DocState<T> = initial, action: DocAction<any, T> | OtherAction, others?: OtherReducer<T>): DocState<T> {
  switch (action.kind) {
    case 'loading':
      return { ...state, loading: true };

    case 'set': {
      const { doc } = state;
      if (doc && doc.__v > action.doc.__v) return state;

      return { ...state, doc: action.doc, loading: false };
    }

    case 'other': {
      const { doc } = state;
      if (!doc || !others) return state;

      return { ...state, doc: others(doc, action) };
    }

    default:
      return state;
  }
}

export function docsReducer<T extends Document>(state: DocsState<T> = {}, action: DocAction<any, T>, others?: OtherReducer<T>): DocsState<T> {
  switch (action.kind) {
    case 'loading':
    case 'set':
    case 'other':
      return { ...state, [action.id]: docReducer(state[action.id], action, others) };

    case 'del': {
      const { [action.id]: _, ...others } = state;
      return others;
    }

    default:
      return state;
  }
}
