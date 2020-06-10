import { useState, useEffect } from 'react';
import { GetTokenSilentlyOptions } from '@auth0/auth0-spa-js';

import { useAuth } from './auth.context';

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
