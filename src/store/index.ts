import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AuthAction } from './auth/types';
import { ErrorsAction } from './errors/types';

import appReducer from './reducers';
import { GlobalAction } from './types';

// Types
export type AppState = ReturnType<typeof appReducer>;
export type AppAction = GlobalAction |
  AuthAction | ErrorsAction;

export type AppDispatch = ThunkDispatch<AppState, {}, AppAction>;
export type AppThunk<R = void> = ThunkAction<R, AppState, {}, AppAction>;

// Store
export const store = createStore(appReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);
