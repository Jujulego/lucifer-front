import Document from './document';
import { PermissionHolder } from './permission';
import { TokenHolder } from './token';

// Interface
interface Daemon extends Document, PermissionHolder, TokenHolder {
  // Attributes
  name?: string;
  user: string;

  readonly lrn: string;
}

// Aliases
export type FullDaemon = Daemon & { secret: string };
export type SimpleDaemon = Omit<Daemon, 'permissions' | 'tokens'>;

export type DaemonCreate = Pick<Daemon, 'name' | 'user'>;
export type DaemonUpdate = Partial<Pick<Daemon, 'name' | 'user'>>;

export default Daemon;
