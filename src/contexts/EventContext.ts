import { createContext, useCallback, useContext, useEffect } from 'react';

import Event from 'data/event';
import { BaseDocument, isDocument } from '../data/document';

// Types
type Updator<T> = (cb: (data?: T) => T) => void;

export type EventHandler = (event: Event) => void;

export interface EventContextProps {
  register:   (room: string, handler: EventHandler) => void;
  unregister: (room: string, handler: EventHandler) => void;
}

// Default values
const eventDefaults: EventContextProps = {
  register: () => {},
  unregister: () => {}
};

// Context
const EventContext = createContext(eventDefaults);

// Hooks
export function useEventRoom(room: string, handler: EventHandler) {
  // Context
  const ctx = useContext(EventContext);

  // Effects
  useEffect(() => {
    // Callback
    const cb = (event: Event) => {
      if (event.target === room) handler(event);
    };

    // Register
    ctx.register(room, cb);

    // Clean up
    return () => { ctx.unregister(room, cb); };
  }, [ctx, room, handler]);
}

export function useDataEvents<T extends BaseDocument>(room: string, update: Updator<T[]>) {
  // Callback
  const handler = useCallback((event: Event) => {
    switch (event.kind) {
      case 'create':
        return update((data = []) => {
          const res = data.filter(doc => doc._id !== event.id);
          res.push(event.value as T);

          return res;
        });

      case 'update':
        return update((data = []) => data.map((doc) => {
          if (doc._id !== event.id) return doc;
          if (isDocument(doc) && isDocument(event.value) && doc.__v > event.value.__v) {
            return doc;
          }

          return event.value as T;
        }));

      case 'delete':
        return update((data = []) =>
          data.filter(doc => doc._id !== event.id)
        );
    }
  }, [update]);

  // Event
  useEventRoom(room, handler);
}

export default EventContext;
