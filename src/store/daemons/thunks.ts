import axios from 'axios';
import { omit } from 'lodash';

import { PLvl, PName } from 'data/permission';
import { FullToken } from 'data/token';
import Daemon, { DaemonUpdate } from 'data/daemon';

import { AppDispatch, AppState, AppThunk } from 'store';
import { authError } from 'store/auth/utils';
import { httpError } from 'store/errors/utils';

import {
  addDaemonAction, addDaemonTokenAction,
  setDaemonAction,
  delDaemonAction
} from './actions';

// Thunks
export const createDaemonToken = (id: string, tags: string[] = []): AppThunk<Promise<FullToken | null>> =>
  async (dispatch: AppDispatch): Promise<FullToken | null> => {
    try {
      // Request for new token
      const res = await axios.post<FullToken>(`/api/daemons/${id}/token`, { tags });
      const token = res.data;

      // Store data
      dispatch(addDaemonTokenAction(id, omit(token, 'token')));
      return token;

    } catch (error) {
      if (authError(error, dispatch)) return null;
      if (httpError(error, dispatch)) return null;
      throw error;
    }
  };

export const getDaemon = (id: string): AppThunk =>
  async (dispatch: AppDispatch, getState: () => AppState) => {
    try {
      // Dont load if already loading
      if (getState().users[id]?.loading) return;

      // Add daemon
      dispatch(addDaemonAction(id));

      // Request for daemon data
      const res = await axios.get<Daemon>(`/api/daemons/${id}`);
      const daemon = res.data;

      // Store data
      dispatch(setDaemonAction(daemon));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const updateDaemon = (id: string, update: DaemonUpdate): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<Daemon>(`/api/daemons/${id}`, update);
      const daemon = res.data;

      // Store data
      dispatch(setDaemonAction(daemon));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const grantDaemon = (id: string, name: PName, level: PLvl): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<Daemon>(`/api/daemons/${id}/grant`, { name, level });
      const daemon = res.data;

      // Store data
      dispatch(setDaemonAction(daemon));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const revokeDaemon = (id: string, name: PName): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.put<Daemon>(`/api/daemons/${id}/revoke`, { name });
      const daemon = res.data;

      // Store data
      dispatch(setDaemonAction(daemon));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const deleteDaemonToken = (id: string, tokenId: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      const res = await axios.delete<Daemon>(`/api/daemons/${id}/token/${tokenId}`);
      const daemon = res.data;

      // Store data
      dispatch(setDaemonAction(daemon));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };

export const deleteDaemon = (id: string): AppThunk =>
  async (dispatch: AppDispatch) => {
    try {
      // Request for update
      await axios.delete<Daemon>(`/api/daemons/${id}`);

      // Store data
      dispatch(delDaemonAction(id));

    } catch (error) {
      if (authError(error, dispatch)) return;
      if (httpError(error, dispatch)) return;
      throw error;
    }
  };
