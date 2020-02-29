// Interfaces
export interface BaseDocument {
  readonly _id: string;
}

interface Document extends BaseDocument {
  readonly __v: number;
}

// Aliases
export type SubDocument = BaseDocument;
export type AnyDocument = BaseDocument & {
  [extra in string | number | symbol]: any;
}

export default Document;
