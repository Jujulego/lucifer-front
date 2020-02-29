import Document from './document';
import { PermissionHolder } from './permission';
import { TokenHolder } from './token';

// Interface
interface User extends Document, PermissionHolder, TokenHolder {
  // Attributes
  email: string;
}

// Aliases
export type Credentials = Pick<User, 'email'> & { password: string };
export type UserUpdate = Partial<Pick<User & Credentials, 'email' | 'password'>>;

export default User;
