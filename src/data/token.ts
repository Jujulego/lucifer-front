import Document from './document';

// Interface
interface Token extends Document {
  from: string,
  createdAt: string,
  updatedAt: string,
}

export default Token;