import axios from "axios";
import { Dispatch } from 'redux';

import User, { Credentials } from 'data/user';
import { authError } from 'store/auth/utils';

import { addUserAction, setUserAction, delUserAction } from 'store/users/actions';

// Types
export type UserUpdate = Partial<Omit<User, '_id' | 'tokens'> & Credentials>

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
      throw error;
    }
  };

export const updateUser = (id: string, update: UserUpdate) =>
  async (dispatch: Dispatch) => {
    try {
      // Request for update
      const res = await axios.put<User>(`/api/user/${id}`, update);
      const user = res.data;

      // Store data
      await dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
      throw error;
    }
  };

export const deleteUserToken = (id: string, tokenId: string) =>
  async (dispatch: Dispatch) => {
    try {
      // Request for update
      const res = await axios.delete<User>(`/api/user/${id}/token/${tokenId}`);
      const user = res.data;

      // Store data
      await dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
      throw error;
    }
  };

export const deleteUser = (id: string) =>
  async (dispatch: Dispatch) => {
    try {
      // Request for update
      await axios.delete<User>(`/api/user/${id}`);

      // Store data
      await dispatch(delUserAction(id));

    } catch (error) {
      if (authError(error, dispatch)) return;
      console.error(error);
      throw error;
    }
  };