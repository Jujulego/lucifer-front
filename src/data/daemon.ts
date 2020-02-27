import Document from './document';
import { PermissionHolder } from './permission';
import Token from './token';

// Interface
interface Daemon extends Document, PermissionHolder {
  // Attributes
  name?: string;
  readonly tokens: Token[];
  lastConnexion?: string;
}

export default Daemon;
