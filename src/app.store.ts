import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ErrorsAction } from 'snack/errors.actions';

import { reducer as errors } from 'snack/errors.reducer';

// Types
export type AppState = ReturnType<typeof appReducer>;
export type AppAction = ErrorsAction;

export type AppDispatch = ThunkDispatch<AppState, {}, AppAction>;
export type AppThunk<R = void> = ThunkAction<R, AppState, {}, AppAction>;

// Reducer
const appReducer = combineReducers({
  errors
});

// Store
export const store = createStore(
  appReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);
