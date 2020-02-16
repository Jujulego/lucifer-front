import Document from './document';

// Interface
interface Token extends Document {
  from: string,
  createdAt: string
}

export default Token;