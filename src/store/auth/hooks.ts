import { useSelector } from 'react-redux';

import { AppState } from 'store/index';
import { useUser } from 'store/users/hooks';

// Hooks
export function useMe() {
  // Redux
  const id = useSelector((state: AppState) => state.auth.user);
  return useUser(id);
}