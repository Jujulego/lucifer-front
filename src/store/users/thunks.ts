import axios from "axios";
import { Dispatch } from 'redux';

import User from 'data/user';
import { authError } from 'store/auth/utils';

import { addUserAction, setUserAction } from 'store/users/actions';

// Thunks
export const getUser = (id: string) =>
  async (dispatch: Dispatch) => {
    try {
      // Add user
      dispatch(addUserAction(id));

      // Request for user data
      const res = await axios.get<User>(`/api/user/${id}`);
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
    }
  };