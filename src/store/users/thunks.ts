import axios from "axios";
import { Dispatch } from 'redux';

import User from 'data/user';
import { authError } from 'store/auth/utils';

import {
  addUserAction, setUserAction,
  loadingUserListAction, setUserListAction
} from 'store/users/actions';

// Thunks
export const getUser = (id: string) =>
  async (dispatch: Dispatch) => {
    try {
      // Add user
      await dispatch(addUserAction(id));

      // Request for user data
      const res = await axios.get<User>(`/api/user/${id}`);
      const user = res.data;

      // Store data
      await dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
    }
  };

export const getAllUsers = () =>
  async (dispatch: Dispatch) => {
    try {
      // Set list loading
      await dispatch(loadingUserListAction());

      // Request for user list
      const res = await axios.get<User[]>('/api/users');
      const users = res.data;

      // Store data
      await dispatch(setUserListAction(users))

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
    }
  };