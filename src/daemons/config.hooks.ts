import { useCallback } from 'react';

import useAPI from 'basics/api.hooks';

import { CreateConfig, DaemonConfig, DaemonConfigType } from './models/config';

// Namespace
export const useDaemonConfigAPI = {
  types: (daemonId: string) => useAPI.get<DaemonConfigType[]>(`/api/daemons/${daemonId}/config/types`),

  post: (daemonId: string) => useAPI.post<CreateConfig, DaemonConfig>(`/api/daemons/${daemonId}/config`),
  get: (daemonId: string) => useAPI.get<DaemonConfig | null>(`/api/daemons/${daemonId}/config`)
};

// Hooks
export function useDaemonConfig(daemonId: string) {
  const { data: config, loading, reload, update } = useDaemonConfigAPI.get(daemonId);
  const { send: create } = useDaemonConfigAPI.post(daemonId);

  return {
    config, loading,
    reload,
    create: useCallback(async (data: CreateConfig) => {
      const result = await create(data);
      update(result);

      return result;
    }, [create, update])
  };
}
