import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import EventContext, { EventHandler } from 'contexts/EventContext';
import Event from 'data/event';

import { AppDispatch, AppState } from 'store';
import { addError } from 'store/errors/actions';

// Types
type Socket = typeof io.Socket;

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

    // Add handler and register
    socket.current.on('event', handler);
    socket.current.emit('register', room);
  }, [socket]);

  const unregister = useCallback((room: string, handler: EventHandler) => {
    if (!socket.current) return;

    // Remove handler
    socket.current.off('event', handler);
  }, [socket]);

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
