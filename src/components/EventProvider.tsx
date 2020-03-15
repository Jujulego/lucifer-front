import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import EventContext, { EventHandler, LinkStatus } from 'contexts/EventContext';
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
  // State
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<LinkStatus>('broken');

  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: AppState) => state.auth.token);

  // Refs
  const handlers = useRef<Handlers>({});

  // Effects
  useEffect(() => {
    if (!token) return;

    // Connect
    const socket = io.connect('/api', { query: { token }, reconnectionAttempts: 5 });
    setSocket(socket);
    setStatus('connecting');

    // Events
    socket.on('event', (event: Event) => { console.log(event); });

    socket.on('connect',       () => { setStatus('connected');  });
    socket.on('reconnecting',  () => { setStatus('connecting'); });
    socket.on('connect_error', () => { setStatus('broken');     });
    socket.on('disconnect',    () => { setStatus('broken');     });

    socket.on('reconnect', () => {
      Object.keys(handlers.current).forEach(room => {
        const rh = handlers.current[room];

        if (rh && rh.length > 0) {
          console.log(`join ${room}`);
          socket!.emit('register', room);
        }
      });
    });

    socket.on('error', (error: any) => {
      if (typeof error === 'string') {
        dispatch(addError(error));
      } else {
        dispatch(addError(error.message));
      }
    });

    // Clean up
    return () => {
      socket?.close();
      setStatus('broken');
    };
  }, [dispatch, handlers, token]);

  // Callbacks
  const register = useCallback((room: string, handler: EventHandler) => {
    if (!socket) return;

    // Add room
    if (!handlers.current[room]) {
      handlers.current[room] = [];
    }

    const rh = handlers.current[room];

    // Add handler
    rh!.push(handler);
    socket.on('event', handler);

    // Register to room if needed
    if (rh!.length === 1) {
      console.log(`join ${room}`);
      socket.emit('register', room);
    }
  }, [socket, handlers]);

  const unregister = useCallback((room: string, handler: EventHandler) => {
    if (!socket) return;

    // Current room
    const rh = handlers.current[room];
    if (!rh) return;

    // Remove handler
    socket.off('event', handler);
    rh.splice(rh.indexOf(handler), 1);

    // Unregister from the room
    if (rh.length === 0) {
      console.log(`leave ${room}`);
      socket.emit('unregister', room);
    }
  }, [socket, handlers]);

  return (
    <EventContext.Provider
      value={{
        status,
        register, unregister
      }}
    >
      { props.children }
    </EventContext.Provider>
  )
};

export default EventProvider;
