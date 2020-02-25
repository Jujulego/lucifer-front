import axios from 'axios';
import { omit } from 'lodash';

import { PLvl, PName } from 'data/permission';
import { FullToken } from 'data/token';
import User, { Credentials } from 'data/user';
import { AppDispatch, AppState, AppThunk } from 'store';
import { authError } from 'store/auth/utils';
import { httpError } from 'store/errors/utils';

import {
  addUserAction, addUserTokenAction,
  setUserAction,
  delUserAction
} from './actions';

// Types
export type UserUpdate = Partial<Omit<User, '_id' | 'lastConnexion' | 'permissions' | 'tokens'> & Credentials>

// Thunks
export const createUserToken = (id: string, tags: string[] = []): AppThunk<Promise<FullToken | null>> =>
  async (dispatch: AppDispatch): Promise<FullToken | null> => {
    try {
      // Request for new token
      const res = await axios.post<FullToken>(`/api/user/${id}/token`, { tags });
      const token = res.data;

      // Store data
      dispatch(addUserTokenAction(id, omit(token, 'token')));
      return token;

    } catch (error) {
      if (authError(error, dispatch)) return null;
      if (httpError(error, dispatch)) return null;
      throw error;
    }
  };

export const getUser = (id: string): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      // Dont load if already loading
      if (getState().users[id]?.loading) return;

      // Add user
      dispatch(addUserAction(id));

      // Request for user data
      const res = await axios.get<User>(`/api/user/${id}`);
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const updateUser = (id: string, update: UserUpdate): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<User>(`/api/user/${id}`, update);
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const grantUser = (id: string, name: PName, level: PLvl): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<User>(`/api/user/${id}/grant`, { name, level });
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const elevateUser = (id: string, admin?: boolean): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<User>(`/api/user/${id}/elevate`, { admin });
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const revokeUser = (id: string, name: PName): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<User>(`/api/user/${id}/revoke`, { name });
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const deleteUserToken = (id: string, tokenId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.delete<User>(`/api/user/${id}/token/${tokenId}`);
      const user = res.data;

      // Store data
      dispatch(setUserAction(user));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const deleteUser = (id: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      await axios.delete<User>(`/api/user/${id}`);

      // Store data
      dispatch(delUserAction(id));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };