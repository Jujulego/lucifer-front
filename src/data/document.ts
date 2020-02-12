// Interface
interface Document {
  "_id": string
}

// Aliases
export interface AnyDocument extends Document {
  [name: string]: any
}

export default Document;