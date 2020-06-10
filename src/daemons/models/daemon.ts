import { User } from 'users/models/user';

// Model
export interface Daemon {
  id: string;
  name?: string;
  owner?: User;
  dependencies: Daemon[];
  dependents: Daemon[];
}
