import { BaseDocument } from './document';

// Types
export type EventKind = Event['kind'];

// Interfaces
interface BaseEvent<K extends string> {
  target: string;
  kind: K;
}

export interface DataEvent extends BaseEvent<'create' | 'update' | 'delete'> {
  id: string;
  value: BaseDocument;
}

// Aliases
type Event = DataEvent;

export default Event;
