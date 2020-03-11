import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import EventContext, { EventHandler } from 'contexts/EventContext';
import Event from 'data/event';

import { AppDispatch, AppState } from 'store';
import { addError } from 'store/errors/actions';

// Types
type Socket = typeof io.Socket;
type Handlers = { [room: string]: EventHandler[] | undefined };

export interface EventProviderProps {
  children: ReactNode
}

// Component
const EventProvider = (props: EventProviderProps) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: AppState) => state.auth.token);

  // Refs
  const socket = useRef<Socket | null>(null);
  const handlers = useRef<Handlers>({});

  // Effects
  useEffect(() => {
    if (!token) return;

    // Connect
    socket.current = io.connect('/api', { query: { token }});
    socket.current.on('event', (event: Event) => { console.log(event); });
    socket.current.on('error', (error: any) => {
      if (typeof error === 'string') {
        dispatch(addError(`WS: ${error}`));
      } else {
        dispatch(addError(`WS: ${error.message}`));
      }
    });

    // Clean up
    return () => { socket.current?.close(); };
  }, [dispatch, token]);

  // Callbacks
  const register = useCallback((room: string, handler: EventHandler) => {
    if (!socket.current) return;

    // Add room
    if (!handlers.current[room]) {
      handlers.current[room] = [];
    }

    const rh = handlers.current[room];

    // Add handler
    rh!.push(handler);
    socket.current.on('event', handler);

    // Register to room if needed
    if (rh!.length === 1) {
      socket.current.emit('register', room);
    }
  }, [socket, handlers]);

  const unregister = useCallback((room: string, handler: EventHandler) => {
    if (!socket.current) return;

    // Current room
    const rh = handlers.current[room];
    if (!rh) return;

    // Remove handler
    socket.current.off('event', handler);
    rh.splice(rh.indexOf(handler), 1);

    // Unregister from the room
    if (rh.length === 0) {
      socket.current.emit('register', room);
    }
  }, [socket, handlers]);

  return (
    <EventContext.Provider
      value={{
        register, unregister
      }}
    >
      { props.children }
    </EventContext.Provider>
  )
};

export default EventProvider;
