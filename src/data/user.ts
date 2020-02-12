import Document from './document';
import Token from './token';

// Interface
interface User extends Document {
  email: string,
  tokens: Token[]
}

// Aliases
export type Credentials = Pick<User, 'email'> & { password: string }

export default User;