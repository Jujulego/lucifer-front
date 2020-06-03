import { Daemon } from 'daemons/models/daemon';

// Model
export interface User {
  id:         string;
  email:      string;
  emailVerified: boolean;
  name:       string;
  username?:  string;
  nickname?:  string;
  givenName?: string;
  familyName?: string;
  createdAt:  string;
  updatedAt?: string;
  picture:    string;
  lastIp?:    string;
  lastLogin?: string;
  blocked?:   boolean;
  daemons?:   Daemon[];
}
