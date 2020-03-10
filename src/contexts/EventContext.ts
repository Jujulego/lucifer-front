import { createContext, useContext, useEffect } from 'react';

import Event from 'data/event';

// Types
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

export default EventContext;
