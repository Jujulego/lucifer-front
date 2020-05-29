// Interface
export interface Document {
  id: number | string;
}

// Alias
export type AnyDocument = Document & {
  [extra in number | string | symbol]: any
};
