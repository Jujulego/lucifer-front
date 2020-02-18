// Interface
interface Document {
  "_id": string;
}

// Aliases
export type AnyDocument = Document & {
  [extra in string | number | symbol]: any;
}

export default Document;