import useAPI from 'basics/api.hooks';
import { useCallback } from 'react';

import { CreateDaemon, Daemon, UpdateDaemon } from './models/daemon';
export * from './models/daemon';

// Types
export interface DaemonsBulkDeleteParams {
  ids: string[];
}

// Namespace
export const useDaemonsAPI = {
  all: () => useAPI.get<Daemon[]>('/api/daemons'),
  create: () => useAPI.post<CreateDaemon, Daemon>('/api/daemons'),
  bulkDelete: () => useAPI.delete<any, DaemonsBulkDeleteParams>('/api/daemons'),

  get: (id: string) => useAPI.get<Daemon>(`/api/daemons/${id}`),
  put: (id: string) => useAPI.put<UpdateDaemon, Daemon>(`/api/daemons/${id}`),
  delete: (id: string) => useAPI.delete(`/api/daemons/${id}`)
};

// Hooks
export function useDaemons() {
  const { data: daemons, loading, reload, update } = useDaemonsAPI.all();
  const { send: create } = useDaemonsAPI.create();
  const { send: remove } = useDaemonsAPI.bulkDelete();

  return {
    daemons, loading, reload,
    create: useCallback(async (data: CreateDaemon) => {
      const result = await create(data);
      update((old = []) => [...old, result]);

      return result;
    }, [create, update]),
    remove: useCallback(async (ids: string[]) => {
      if (ids.length) {
        await remove({ ids });
        update((old = []) => old.filter(dmn => !ids.includes(dmn.id)));
      }
    }, [remove, update])
  }
}

export function useDaemon(id: string) {
  const { data: daemon, loading, reload, update } = useDaemonsAPI.get(id);
  const { send: put } = useDaemonsAPI.put(id);

  return {
    daemon, loading,
    reload,
    update: useCallback(async (data: UpdateDaemon) => {
      const result = await put(data);
      update(result);

      return result;
    }, [put, update])
  };
}
