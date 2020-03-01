import Document from './document';
import { PermissionHolder } from './permission';
import { TokenHolder } from './token';

// Interface
interface Daemon extends Document, PermissionHolder, TokenHolder {
  // Attributes
  name?: string;
  user: string;
}

// Aliases
export type DaemonCreate = Pick<Daemon, 'name' | 'user'>;
export type DaemonUpdate = Partial<Pick<Daemon, 'name' | 'user'>>;

export default Daemon;
