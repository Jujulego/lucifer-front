import { SubDocument } from './document';

// Interface
interface Token extends SubDocument {
  from: string;
  createdAt: string;
  tags: string[];
}

// Aliases
export type FullToken = Token & { token: string };

export default Token;