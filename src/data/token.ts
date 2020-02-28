import { SubDocument } from './document';

// Interface
interface Token extends SubDocument {
  // Attributes
  from: string;
  createdAt: string;
  tags: string[];
}

// Types
export interface TokenHolder {
  // Attributes
  readonly lastConnexion?: string;
  readonly tokens: Token[];
}

// Aliases
export type FullToken = Token & { token: string };

export default Token;
