import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AuthAction } from 'auth/auth.actions';
import { ErrorsAction } from 'errors/errors.actions';

import { reducer as auth } from 'auth/auth.reducer';
import { reducer as errors } from 'errors/errors.reducer';

// Types
export type AppState = ReturnType<typeof appReducer>;
export type AppAction = AuthAction | ErrorsAction;

export type AppDispatch = ThunkDispatch<AppState, {}, AppAction>;
export type AppThunk<R = void> = ThunkAction<R, AppState, {}, AppAction>;

// Reducer
const appReducer = combineReducers({
  auth,
  errors
});

// Store
export const store = createStore(
  appReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);
