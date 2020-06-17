import useAPI from 'basics/api.hooks';

import { DaemonConfig, DaemonConfigType } from './models/config';

// Namespace
export const useDaemonConfigAPI = {
  getTypes: (daemonId: string) => useAPI.get<DaemonConfigType[]>(`/api/daemons/${daemonId}/config/types`),

  get: (daemonId: string) => useAPI.get<DaemonConfig | null>(`/api/daemons/${daemonId}/config`)
};
