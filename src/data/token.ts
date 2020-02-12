import Document from './document';

// Interface
interface Token extends Document {
  from: string,
  createdAt: string,
  updatedAt: string,
}

// Aliases
export type LoginToken = Document & { token: string };

export default Token;