import Document from './document';
import { PermissionHolder } from './permission';
import Token from './token';

// Interface
interface User extends Document, PermissionHolder {
  email: string;
  tokens: Token[];
  lastConnexion?: string;
}

// Aliases
export type Credentials = Pick<User, 'email'> & { password: string }

export default User;