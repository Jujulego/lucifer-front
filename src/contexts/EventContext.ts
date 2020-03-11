import { createContext, useCallback, useContext, useEffect } from 'react';

import Event from 'data/event';
import { BaseDocument, isDocument } from 'data/document';

import { Filter, toPredicate } from 'utils/filter';

// Types
type Updator<T> = (cb: (data?: T) => T) => void;

export type LinkStatus = 'broken' | 'connecting' | 'connected';
export type EventHandler = (event: Event) => void;

export interface EventContextProps {
  status: LinkStatus;
  register:   (room: string, handler: EventHandler) => void;
  unregister: (room: string, handler: EventHandler) => void;
}

// Default values
const eventDefaults: EventContextProps = {
  status: 'broken',
  register: () => {},
  unregister: () => {}
};

// Context
const EventContext = createContext(eventDefaults);

// Hooks
export function useEventRoom(room: string | undefined, handler: EventHandler) {
  // Context
  const { register, unregister } = useContext(EventContext);

  // Effects
  useEffect(() => {
    if (!room) return;

    // Callback
    const cb = (event: Event) => {
      if (event.target === room) handler(event);
    };

    // Register
    register(room, cb);

    // Clean up
    return () => { unregister(room, cb); };
  }, [register, unregister, room, handler]);
}

export function useDataEvents<T extends BaseDocument>(room: string | undefined, update: Updator<T[]>, filter?: Filter<T>) {
  // Callback
  const handler = useCallback((event: Event) => {
    const predicate = filter ? toPredicate(filter) : () => true;

    switch (event.kind) {
      case 'create':
        if (!predicate(event.value as T)) return;
        return update((data = []) => {
          const res = data.filter(doc => doc._id !== event.id);
          res.push(event.value as T);

          return res;
        });

      case 'update':
        if (!predicate(event.value as T)) return;
        return update((data = []) => data.map((doc) => {
          if (doc._id !== event.id) return doc;
          if (isDocument(doc) && isDocument(event.value) && doc.__v > event.value.__v) {
            return doc;
          }

          return event.value as T;
        }));

      case 'delete':
        if (!predicate(event.value as T)) return;
        return update((data = []) =>
          data.filter(doc => doc._id !== event.id)
        );
    }
  }, [filter, update]);

  // Event
  useEventRoom(room, handler);
}

export function useUpdateEvent<T extends BaseDocument>(room: string | undefined, cb: (data: T) => void) {
  // Callbacks
  const handler = useCallback((event: Event) => {
    if (event.kind === 'update') {
      cb(event.value as T);
    }
  }, [cb]);

  // Event
  useEventRoom(room, handler);
}

export default EventContext;
