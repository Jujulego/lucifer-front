import Document from './document';

// Interface
interface Token extends Document {
  from: string;
  createdAt: string;
  tags: string[];
}

export default Token;