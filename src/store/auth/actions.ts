import { setActionCreator as setAC } from 'utils/actions/set';

import { SET_TOKEN, SET_USER } from './constants';
import { AuthAction } from './types';

// Actions
export const setToken = setAC<AuthAction, typeof SET_TOKEN>(SET_TOKEN);
export const setUser = setAC<AuthAction, typeof SET_USER>(SET_USER);