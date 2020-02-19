import Document from './document';

// Interface
interface Token extends Document {
  from: string;
  createdAt: string;
  tags: string[];
}

// Aliases
export type FullToken = Token & { token: string };

export default Token;