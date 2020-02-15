import { Dispatch } from 'redux';

import { logoutAction } from './actions';
import axios from 'axios';

// Functions
export const authError = (error: any, dispatch: Dispatch) => {
  if (error.response && error.response.status === 401) {
    // Remove token & user
    dispatch(logoutAction());

    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];

    return true;
  }

  return false;
};