import { Action } from 'redux';

import { AuthAction } from './auth/types';
import { UsersAction } from './users/types';

import { GLOBAL_RESET } from './constants';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from 'store/index';

// Actions
export type GlobalAction = Action<typeof GLOBAL_RESET>;
export type AppAction = GlobalAction | AuthAction | UsersAction;

// Thunks
export type AppDispatch = ThunkDispatch<AppState, {}, AppAction>;
export type AppThunk<R = void> = ThunkAction<R, AppState, {}, AppAction>;