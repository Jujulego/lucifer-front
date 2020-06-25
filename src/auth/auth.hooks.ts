import { GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';
import { useState, useEffect } from 'react';

import useAPI from 'basics/api.hooks';

import { useAuth } from './auth.context';

// Namespace
export const useAuthAPI = {
  permissions: () => useAPI.get<string[]>('/api/auth/permissions')
};

// Hooks
export function useAuthToken(options?: GetTokenSilentlyOptions): string {
  // State
  const [token, setToken] = useState('');

  // Auth
  const { getToken } = useAuth();

  // Effect
  useEffect(() => {
    (async () => {
      setToken(await getToken(options));
    })();
  }, [getToken, options]);

  return token;
}

export function usePermissions() {
  const { data: permissions, loading, reload } = useAuthAPI.permissions();

  return {
    permissions, loading,
    reload
  };
}
