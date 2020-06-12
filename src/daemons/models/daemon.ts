import { User } from 'users/models/user';

// Model
export interface Daemon {
  id: string;
  name?: string;
  owner?: User;
  dependencies: Daemon[];
  dependents: Daemon[];
}

export interface CreateDaemon {
  name?: string;
  ownerId?: string;
}

export interface UpdateDaemon {
  name?: string;
  ownerId?: string;
}
