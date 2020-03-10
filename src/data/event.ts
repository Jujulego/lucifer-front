import { BaseDocument as Document, AnyDocument } from './document';

// Types
export type EventKind = Event['kind'];

// Interfaces
interface BaseEvent<K extends string> {
  target: string;
  kind: K;
}

export interface DataEvent<T extends Document> extends BaseEvent<'create' | 'update' | 'delete'> {
  id: string;
  value: T;
}

// Aliases
type Event = DataEvent<AnyDocument>;

export default Event;
